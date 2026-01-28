# 📊 DevTrace - Developer Productivity & Quality Pulse

A lightweight full-stack application that tracks developer tasks, test coverage, and code quality signals to support team productivity and delivery health.

![DevTrace Dashboard](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Problem Statement

Software development teams need visibility into:
- **Test Coverage**: Are features being properly tested?
- **Quality Metrics**: Which tasks carry technical risk?
- **Delivery Health**: What's the overall team productivity pulse?

Traditional project management tools track **tasks**, but not **engineering quality signals**.

**DevTrace** bridges this gap by combining task tracking with automated quality scoring based on test status and code complexity.

---

## ✨ Key Features

### 1️⃣ Task + Quality Entry
Log development tasks with essential quality metrics:
- Task Name & Developer
- Status (Planned / In Progress / Done)
- Test Status (Not Tested / Passed / Failed)
- Code Complexity (Low / Medium / High)

### 2️⃣ Intelligent Quality Scoring
**Automatic quality score calculation** based on:
```
✅ Passed Tests + Low Complexity → Score: 90 (Excellent)
⚠️ Not Tested + Medium Complexity → Score: 50 (At Risk)
❌ Not Tested + High Complexity → Score: 30 (Critical)
```

**Algorithm Logic:**
- Base score: 50
- Test Passed: +30
- Test Failed: -20
- Not Tested: -10
- Low Complexity: +20
- Medium Complexity: +10
- High Complexity: -10
- **Special Case**: High complexity without tests = 30 (Critical Risk)

### 3️⃣ Real-time Dashboard
Visual insights include:
- **Total Tasks**: Overall workload
- **Test Coverage %**: Tasks that are tested
- **Average Quality Score**: Team health indicator
- **Tasks at Risk**: Items needing attention (score < 50)
- **Charts**: Status distribution & test coverage visualization

### 4️⃣ Automated Testing
Built-in test suite validates:
- Quality score calculation logic
- Edge cases and boundaries
- Business rules enforcement

### 5️⃣ Automation-Ready Architecture
Designed for CI/CD integration:
- `npm test` for automated testing
- Simple JSON-based data storage
- RESTful API architecture

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  HTML5 UI    │  │  CSS3 Styles │  │  JavaScript  │     │
│  │  (Dashboard) │  │  (Modern)    │  │  (Chart.js)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────────┐
│                       Backend Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Express.js  │  │  Quality     │  │  RESTful     │     │
│  │  Server      │  │  Calculator  │  │  API         │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ File I/O
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│                  ┌──────────────────┐                        │
│                  │  tasks.json      │                        │
│                  │  (File-based DB) │                        │
│                  └──────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | User interface |
| **Visualization** | Chart.js | Interactive charts |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | JSON file storage | Lightweight data persistence |
| **Testing** | Custom test framework | Automated quality validation |

---

## 📂 Project Structure

```
devtrace-project/
├── server.js                 # Express.js backend server
├── package.json             # Node.js dependencies
├── data/
│   └── tasks.json          # JSON database (auto-created)
├── public/
│   ├── index.html          # Main dashboard UI
│   ├── styles.css          # Modern styling
│   └── app.js              # Frontend logic
├── tests/
│   └── test.js             # Automated test suite
├── README.md               # This file
└── SETUP_GUIDE.md          # Installation instructions
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- Any modern web browser

### Installation

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Install with default settings

2. **Extract Project**
   - Extract `devtrace-project.zip` to your Desktop
   - Open folder in VS Code

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Open Browser**
   - Navigate to: `http://localhost:3000`
   - Dashboard loads automatically

6. **Run Tests**
   ```bash
   npm test
   ```

---

## 🎮 Usage Guide

### Adding a Task
1. Fill in the form:
   - **Task Name**: e.g., "Implement user authentication"
   - **Developer Name**: e.g., "John Doe"
   - **Status**: Choose current state
   - **Test Status**: Select test coverage
   - **Complexity**: Rate code complexity
2. Click **"Add Task"**
3. Quality score is calculated automatically

### Understanding Quality Scores

| Score Range | Status | Color | Meaning |
|------------|--------|-------|---------|
| 70-100 | Excellent | 🟢 Green | Well-tested, low risk |
| 50-69 | Moderate | 🟡 Yellow | Acceptable, monitor |
| 0-49 | At Risk | 🔴 Red | Needs attention |

### Dashboard Metrics

**Total Tasks**: Count of all logged tasks
**% Tasks Tested**: Coverage metric (Passed + Failed) / Total
**Avg Quality Score**: Team productivity indicator
**Tasks at Risk**: Count of tasks with score < 50

---

## 🧪 Test Strategy

### Test Coverage
The test suite validates:
1. **Optimal Scenario**: Passed + Low Complexity = 90
2. **Failed Tests**: Always result in score < 50
3. **Worst Case**: Not Tested + High Complexity = 30
4. **Boundary Validation**: Scores always between 0-100
5. **Business Rules**: Test impact > Complexity impact

### Running Tests
```bash
npm test
```

**Expected Output:**
```
🧪 Running Test Suite: DevTrace Quality Score Tests
=============================================================
✅ PASS: Quality Score: Passed + Low Complexity = 90
✅ PASS: Quality Score: Failed + Medium Complexity < 50
✅ PASS: Quality Score: High Complexity + Not Tested = 30
...
Success Rate: 100%
```

---

## 🔄 CI/CD Integration

### Conceptual CI Pipeline

```yaml
# Example: GitHub Actions workflow
name: DevTrace CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build application
        run: echo "Build step (if needed)"
      - name: Deploy
        run: echo "Deploy to production"
```

### Automation Benefits
- **Automated Testing**: Tests run on every commit
- **Quality Gates**: Builds fail if tests fail
- **Continuous Validation**: Ensures code quality
- **Fast Feedback**: Developers notified immediately

---

## 📊 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### GET `/api/tasks`
**Description**: Retrieve all tasks
**Response**: Array of task objects

#### POST `/api/tasks`
**Description**: Create a new task
**Body**:
```json
{
  "taskName": "string",
  "developerName": "string",
  "status": "Planned | In Progress | Done",
  "testStatus": "Not Tested | Passed | Failed",
  "complexity": "Low | Medium | High"
}
```
**Response**: Created task with auto-calculated quality score

#### GET `/api/metrics`
**Description**: Get dashboard metrics
**Response**:
```json
{
  "totalTasks": 10,
  "testedPercentage": 80,
  "avgQualityScore": 72,
  "tasksAtRisk": 2,
  "statusBreakdown": {...},
  "testCoverage": {...}
}
```

#### GET `/api/tasks/:id`
**Description**: Get single task by ID

#### PUT `/api/tasks/:id`
**Description**: Update existing task

#### DELETE `/api/tasks/:id`
**Description**: Delete a task

---

## 🎨 Design Highlights

### Modern UI/UX
- **Gradient Background**: Professional visual appeal
- **Card-based Layout**: Clean information hierarchy
- **Responsive Design**: Works on all screen sizes
- **Interactive Charts**: Visual data representation
- **Real-time Updates**: Instant feedback on actions
- **Color-coded Metrics**: Quick status identification

### Accessibility
- Semantic HTML
- ARIA labels (can be enhanced)
- Keyboard navigation support
- High contrast ratios

---

## 🔮 Future Enhancements

### Phase 1: Enhanced Tracking
- [ ] Time tracking per task
- [ ] Sprint/milestone grouping
- [ ] Historical trend analysis
- [ ] Team member profiles

### Phase 2: Advanced Analytics
- [ ] Predictive quality scores
- [ ] Machine learning integration
- [ ] Anomaly detection
- [ ] Performance benchmarking

### Phase 3: Team Collaboration
- [ ] Real-time collaboration
- [ ] Comments and discussions
- [ ] File attachments
- [ ] Notifications system

### Phase 4: Integration
- [ ] Jira/GitHub integration
- [ ] Slack notifications
- [ ] Calendar sync
- [ ] Export reports (PDF/Excel)

### Phase 5: Enterprise Features
- [ ] User authentication
- [ ] Role-based access control
- [ ] Multi-team support
- [ ] Database migration (PostgreSQL)

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ **Full-stack development**: Frontend + Backend + Database
- ✅ **RESTful API design**: Industry-standard architecture
- ✅ **Test automation**: Critical for QA roles
- ✅ **Quality metrics**: Shows analytical thinking
- ✅ **Modern JavaScript**: ES6+ features
- ✅ **Data visualization**: Chart.js integration
- ✅ **Professional documentation**: README best practices


---

## 📝 License

This project is released under a **Dual Licensing model**.

```
### Academic / Research Use
- Students, educators, and researchers may **view, download, and run**
  this project for learning or research purposes.
- **Prior written permission from the author is required** before using
  the project for academic submissions, research work, or publications.

### Commercial / Organizational Use
- Any use by companies, startups, organizations, or for-profit entities
  **requires a paid commercial license**.
- Commercial use without permission is strictly prohibited and may result
  in legal action.

For full legal terms, see the [`LICENSE`](./LICENSE) file.

For permission or commercial licensing inquiries, contact:
**Sayli Takale**
saylitakale2308@gmail.com
```

---

## 📧 Contact & Support

**Project Creator**: Sayli Takale
**Email**: saylitakale2308@gmail.com
**LinkedIn**: https://www.linkedin.com/in/saylitakale


---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [Testing JavaScript Applications](https://testingjavascript.com/)

---
