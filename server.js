const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database (simple JSON storage)
const DB_FILE = path.join(__dirname, 'data', 'tasks.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize database if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper function to read tasks
function readTasks() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write tasks
function writeTasks(tasks) {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

// Quality Score Calculation Logic
function calculateQualityScore(testStatus, complexity) {
    let score = 50; // Base score

    // Test status impact
    if (testStatus === 'Passed') {
        score += 30;
    } else if (testStatus === 'Failed') {
        score -= 20;
    } else if (testStatus === 'Not Tested') {
        score -= 10;
    }

    // Complexity impact
    if (complexity === 'Low') {
        score += 20;
    } else if (complexity === 'Medium') {
        score += 10;
    } else if (complexity === 'High') {
        score -= 10;
    }

    // Special case: High complexity with no tests
    if (complexity === 'High' && testStatus === 'Not Tested') {
        score = 30;
    }

    // Special case: Passed tests with low complexity
    if (testStatus === 'Passed' && complexity === 'Low') {
        score = 90;
    }

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score));
}

// API Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Create new task
app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const { taskName, developerName, status, testStatus, complexity } = req.body;

    // Validation
    if (!taskName || !developerName || !status || !testStatus || !complexity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Calculate quality score
    const qualityScore = calculateQualityScore(testStatus, complexity);

    const newTask = {
        id: Date.now().toString(),
        taskName,
        developerName,
        status,
        testStatus,
        complexity,
        qualityScore,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { taskName, developerName, status, testStatus, complexity } = req.body;
    const qualityScore = calculateQualityScore(testStatus, complexity);

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        taskName,
        developerName,
        status,
        testStatus,
        complexity,
        qualityScore,
        updatedAt: new Date().toISOString()
    };

    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const filteredTasks = tasks.filter(t => t.id !== req.params.id);

    if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }

    writeTasks(filteredTasks);
    res.json({ message: 'Task deleted successfully' });
});

// Get dashboard metrics
app.get('/api/metrics', (req, res) => {
    const tasks = readTasks();

    if (tasks.length === 0) {
        return res.json({
            totalTasks: 0,
            testedPercentage: 0,
            avgQualityScore: 0,
            tasksAtRisk: 0,
            statusBreakdown: { Planned: 0, 'In Progress': 0, Done: 0 },
            testCoverage: { 'Not Tested': 0, Passed: 0, Failed: 0 }
        });
    }

    const totalTasks = tasks.length;
    const testedTasks = tasks.filter(t => t.testStatus !== 'Not Tested').length;
    const testedPercentage = Math.round((testedTasks / totalTasks) * 100);

    const avgQualityScore = Math.round(
        tasks.reduce((sum, task) => sum + task.qualityScore, 0) / totalTasks
    );

    const tasksAtRisk = tasks.filter(t => t.qualityScore < 50).length;

    const statusBreakdown = {
        Planned: tasks.filter(t => t.status === 'Planned').length,
        'In Progress': tasks.filter(t => t.status === 'In Progress').length,
        Done: tasks.filter(t => t.status === 'Done').length
    };

    const testCoverage = {
        'Not Tested': tasks.filter(t => t.testStatus === 'Not Tested').length,
        Passed: tasks.filter(t => t.testStatus === 'Passed').length,
        Failed: tasks.filter(t => t.testStatus === 'Failed').length
    };

    res.json({
        totalTasks,
        testedPercentage,
        avgQualityScore,
        tasksAtRisk,
        statusBreakdown,
        testCoverage
    });
});

// Export calculateQualityScore for testing
module.exports = { calculateQualityScore, app };

// Start server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 DevTrace server running on http://localhost:${PORT}`);
        console.log(`📊 Dashboard: http://localhost:${PORT}`);
        console.log(`🔌 API: http://localhost:${PORT}/api/tasks`);
    });
}