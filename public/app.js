// API Base URL
const API_URL = 'http://localhost:3000/api';

// Chart instances
let statusChart = null;
let testChart = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    loadDashboard();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const taskData = {
        taskName: document.getElementById('taskName').value,
        developerName: document.getElementById('developerName').value,
        status: document.getElementById('status').value,
        testStatus: document.getElementById('testStatus').value,
        complexity: document.getElementById('complexity').value
    };

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            // Reset form
            e.target.reset();

            // Reload dashboard
            await loadDashboard();

            // Show success message (optional)
            showNotification('Task added successfully!', 'success');
        } else {
            showNotification('Error adding task', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

// Load dashboard data
async function loadDashboard() {
    try {
        // Fetch metrics
        const metricsResponse = await fetch(`${API_URL}/metrics`);
        const metrics = await metricsResponse.json();
        updateMetrics(metrics);
        updateCharts(metrics);

        // Fetch tasks
        const tasksResponse = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksResponse.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Update metrics display
function updateMetrics(metrics) {
    document.getElementById('totalTasks').textContent = metrics.totalTasks;
    document.getElementById('testedPercentage').textContent = `${metrics.testedPercentage}%`;
    document.getElementById('avgQualityScore').textContent = metrics.avgQualityScore;
    document.getElementById('tasksAtRisk').textContent = metrics.tasksAtRisk;
}

// Initialize charts
function initializeCharts() {
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const testCtx = document.getElementById('testChart').getContext('2d');

    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Planned', 'In Progress', 'Done'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#3b82f6',
                    '#f59e0b',
                    '#10b981'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });

    testChart = new Chart(testCtx, {
        type: 'doughnut',
        data: {
            labels: ['Not Tested', 'Passed', 'Failed'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#94a3b8',
                    '#10b981',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });
}

// Update charts with new data
function updateCharts(metrics) {
    // Update status chart
    statusChart.data.datasets[0].data = [
        metrics.statusBreakdown.Planned,
        metrics.statusBreakdown['In Progress'],
        metrics.statusBreakdown.Done
    ];
    statusChart.update();

    // Update test chart
    testChart.data.datasets[0].data = [
        metrics.testCoverage['Not Tested'],
        metrics.testCoverage.Passed,
        metrics.testCoverage.Failed
    ];
    testChart.update();
}

// Render tasks list
function renderTasks(tasks) {
    const tasksList = document.getElementById('tasksList');

    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p class="empty-state-text">No tasks yet. Add your first task above!</p>
            </div>
        `;
        return;
    }

    // Sort by creation date (newest first)
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-header">
                <div>
                    <div class="task-title">${escapeHtml(task.taskName)}</div>
                    <div class="task-developer">👤 ${escapeHtml(task.developerName)}</div>
                </div>
                <div class="quality-badge ${getQualityClass(task.qualityScore)}">
                    Score: ${task.qualityScore}
                </div>
            </div>
            <div class="task-details">
                <div class="task-detail">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">
                        <span class="status-badge ${getStatusClass(task.status)}">
                            ${task.status}
                        </span>
                    </span>
                </div>
                <div class="task-detail">
                    <span class="detail-label">Test Status</span>
                    <span class="detail-value ${getTestClass(task.testStatus)}">
                        ${getTestIcon(task.testStatus)} ${task.testStatus}
                    </span>
                </div>
                <div class="task-detail">
                    <span class="detail-label">Complexity</span>
                    <span class="detail-value ${getComplexityClass(task.complexity)}">
                        ${getComplexityIcon(task.complexity)} ${task.complexity}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper functions for styling
function getQualityClass(score) {
    if (score >= 70) return 'quality-high';
    if (score >= 50) return 'quality-medium';
    return 'quality-low';
}

function getStatusClass(status) {
    if (status === 'Planned') return 'status-planned';
    if (status === 'In Progress') return 'status-progress';
    return 'status-done';
}

function getTestClass(testStatus) {
    if (testStatus === 'Not Tested') return 'test-not-tested';
    if (testStatus === 'Passed') return 'test-passed';
    return 'test-failed';
}

function getTestIcon(testStatus) {
    if (testStatus === 'Passed') return '✅';
    if (testStatus === 'Failed') return '❌';
    return '⚪';
}

function getComplexityClass(complexity) {
    if (complexity === 'Low') return 'complexity-low';
    if (complexity === 'Medium') return 'complexity-medium';
    return 'complexity-high';
}

function getComplexityIcon(complexity) {
    if (complexity === 'Low') return '🟢';
    if (complexity === 'Medium') return '🟡';
    return '🔴';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification (simple implementation)
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);