# 🚀 DevTrace Setup Guide for Windows

**Complete step-by-step installation guide for beginners on Windows**

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Windows 10 or Windows 11
- [ ] Internet connection
- [ ] Administrator access on your computer
- [ ] At least 500 MB free disk space

---

## 🛠️ Step 1: Install Node.js

Node.js is required to run the backend server.

### 1.1 Download Node.js
1. Open your web browser
2. Go to: **https://nodejs.org/**
3. Click the **green button** that says "LTS" (Long Term Support)
   - Example: "18.19.0 LTS (Recommended For Most Users)"
4. Download will start automatically
5. File name will be like: `node-v18.19.0-x64.msi`

### 1.2 Install Node.js
1. **Find the downloaded file**
   - Usually in: `C:\Users\YourName\Downloads\`
2. **Double-click** the `.msi` file
3. Click **"Next"** on the setup wizard
4. **Accept** the license agreement
5. Keep default installation path: `C:\Program Files\nodejs\`
6. Click **"Next"** → **"Next"** → **"Install"**
7. Wait for installation (takes 2-3 minutes)
8. Click **"Finish"**

### 1.3 Verify Installation
1. Press `Windows Key + R`
2. Type: `cmd` and press Enter
3. In the black window (Command Prompt), type:
   ```
   node --version
   ```
4. Press Enter
5. You should see something like: `v18.19.0`
6. Also type:
   ```
   npm --version
   ```
7. You should see something like: `9.2.0`

**✅ If you see version numbers, Node.js is installed correctly!**

---

## 📁 Step 2: Set Up the Project

### 2.1 Extract the Project
1. **Locate** the project ZIP file (if you have it as a ZIP)
2. **Right-click** on the ZIP file
3. Select **"Extract All..."**
4. Choose **Desktop** as the location
5. Click **"Extract"**

**OR** if you're creating from scratch:

### 2.2 Create Project Folder
1. **Right-click** on your Desktop
2. Select **New** → **Folder**
3. Name it: `devtrace-project`
4. Press Enter

---

## 💻 Step 3: Open in VS Code

### 3.1 Open VS Code
1. **Search** for "Visual Studio Code" in Windows Start Menu
2. Click to open it

### 3.2 Open Project Folder
1. In VS Code, click **File** → **Open Folder**
2. Navigate to Desktop
3. Select **devtrace-project** folder
4. Click **"Select Folder"**
5. If asked "Do you trust the authors?", click **"Yes, I trust the authors"**

### 3.3 Open Terminal in VS Code
1. In VS Code menu, click **Terminal** → **New Terminal**
2. A panel will open at the bottom
3. You should see something like:
   ```
   PS C:\Users\YourName\Desktop\devtrace-project>
   ```

**✅ You're now ready to install dependencies!**

---

## 📦 Step 4: Install Dependencies

In the VS Code terminal (bottom panel), type:

```bash
npm install
```

Press **Enter**

**What happens:**
- npm will download required packages
- You'll see progress messages
- Takes 30-60 seconds
- Creates a `node_modules` folder

**Expected output:**
```
added 57 packages, and audited 58 packages in 15s
found 0 vulnerabilities
```

**✅ If you see "found 0 vulnerabilities", installation succeeded!**

---

## ▶️ Step 5: Run the Application

### 5.1 Start the Server

In VS Code terminal, type:

```bash
npm start
```

Press **Enter**

**You should see:**
```
🚀 DevTrace server running on http://localhost:3000
📊 Dashboard: http://localhost:3000
🔌 API: http://localhost:3000/api/tasks
```

**✅ Server is running! Don't close this window.**

### 5.2 Open the Dashboard

1. Open your web browser (Chrome, Edge, Firefox)
2. Type in the address bar: `localhost:3000`
3. Press Enter

**You should see:**
- A beautiful purple gradient background
- "DevTrace" logo and title
- Dashboard with metrics (all zeros initially)
- A form to add tasks

**✅ Congratulations! Your app is running!**

---

## 🧪 Step 6: Run Tests

### 6.1 Open a New Terminal
1. In VS Code, click **Terminal** → **New Terminal**
2. Or click the **"+"** button in the terminal panel
3. A second terminal tab will open

### 6.2 Run Test Suite

In the new terminal, type:

```bash
npm test
```

Press **Enter**

**You should see:**
```
🧪 Running Test Suite: DevTrace Quality Score Tests
=============================================================
✅ PASS: Quality Score: Passed + Low Complexity = 90
✅ PASS: Quality Score: Failed + Medium Complexity < 50
✅ PASS: Quality Score: High Complexity + Not Tested = 30
...
Success Rate: 100%
```

**✅ All tests passing! Your app logic is working correctly.**

---

## 🎮 Step 7: Try the Application

### Add Your First Task

1. In the browser (where DevTrace is open)
2. Fill in the form:
   - **Task Name**: "Setup development environment"
   - **Developer Name**: Your name
   - **Status**: "Done"
   - **Test Status**: "Passed"
   - **Complexity**: "Low"
3. Click **"Add Task"**

**What happens:**
- Form clears
- Task appears in the list below
- Dashboard metrics update automatically
- Quality score is calculated: **90** (Excellent!)

### Add More Tasks

Try different combinations:
1. **High Risk Task**:
   - Status: "In Progress"
   - Test Status: "Not Tested"
   - Complexity: "High"
   - Expected Score: **30** (At Risk!)

2. **Medium Quality Task**:
   - Status: "In Progress"
   - Test Status: "Not Tested"
   - Complexity: "Medium"
   - Expected Score: **50** (Moderate)

**Watch the dashboard update:**
- Total tasks increases
- Test percentage changes
- Average quality score recalculates
- Charts update visually

---

## 🛑 Step 8: Stop the Application

When you're done testing:

1. Go to VS Code
2. Click in the terminal where server is running
3. Press: `Ctrl + C`
4. Server will stop
5. You can close VS Code

**To run again later:**
1. Open VS Code
2. Open the `devtrace-project` folder
3. Open Terminal
4. Type: `npm start`

---

## 📂 Project File Structure Explained

```
devtrace-project/
│
├── 📄 package.json          # Project configuration & dependencies
├── 📄 server.js             # Backend server code (Node.js + Express)
├── 📄 README.md             # Main documentation
├── 📄 SETUP_GUIDE.md        # This file
│
├── 📁 data/
│   └── 📄 tasks.json        # Database (auto-created when you add tasks)
│
├── 📁 public/               # Frontend files
│   ├── 📄 index.html        # Main webpage
│   ├── 📄 styles.css        # Styling (colors, layout)
│   └── 📄 app.js            # Frontend logic (handles clicks, updates)
│
├── 📁 tests/                # Automated tests
│   └── 📄 test.js           # Test suite for quality scoring
│
└── 📁 node_modules/         # Installed packages (auto-created)
    └── [57 packages]
```

**Which files to edit:**
- **For UI changes**: `public/index.html` and `public/styles.css`
- **For backend logic**: `server.js`
- **For frontend behavior**: `public/app.js`
- **For tests**: `tests/test.js`

---

## ❓ Troubleshooting

### Problem: "npm is not recognized"

**Solution:**
1. Node.js not installed correctly
2. Reinstall Node.js from https://nodejs.org/
3. Make sure to restart Command Prompt after installation

---

### Problem: "Port 3000 already in use"

**Solution:**
1. Another app is using port 3000
2. Stop other servers, or
3. Change port in `server.js`:
   ```javascript
   const PORT = 3001; // Change from 3000 to 3001
   ```

---

### Problem: "Cannot find module 'express'"

**Solution:**
1. Dependencies not installed
2. Run: `npm install` again
3. Check that `node_modules` folder exists

---

### Problem: Page shows blank white screen

**Solution:**
1. Make sure server is running (check terminal)
2. Check URL is exactly: `localhost:3000` (not localhost:3000/)
3. Refresh the page (F5 or Ctrl+R)
4. Check browser console (F12) for errors

---

### Problem: Dashboard shows no data

**Solution:**
1. This is normal if no tasks added yet
2. Add a task using the form
3. Check `data/tasks.json` exists

---

## 🎯 Testing Checklist

Verify:

- [ ] Server starts without errors (`npm start`)
- [ ] Dashboard loads in browser
- [ ] Can add a task successfully
- [ ] Metrics update correctly
- [ ] Charts display properly
- [ ] Tests pass completely (`npm test`)
- [ ] Quality scores calculate correctly:
  - [ ] Passed + Low = 90
  - [ ] Not Tested + High = 30
  - [ ] Failed tests give score < 50

---

