# CareerNova AI

CareerNova is a production-grade, AI-driven Career Intelligence Platform built for Hackathons. It extracts structural "Career DNA" from standard Resume/Marksheet PDFs and dynamically maps candidates into analytical career paths featuring real-time success scores, salary progression simulators, and smart college matching algorithms.

## Tech Stack
- **Frontend**: Next.js 15 (React), Tailwind CSS, Framer Motion, React Three Fiber (3D Backgrounds).
- **Backend**: Node.js, Express, Multer (Memory Storage), PDFKit for deterministic dashboard reporting.
- **AI Core**: Custom regex and heuristic term-matching algorithms.

---

## 🚀 How to Run Locally

You will need **two separate terminals** open to run the CareerNova platform, one for the backend server and one for the frontend UI.

### Step 1: Start the Backend AI Engine
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install any missing dependencies:
   ```bash
   npm install
   ```
3. Start the node server:
   ```bash
   node server.js
   ```
   *You should see `Server running on port 5000` in the console. Keep this terminal open!*

### Step 2: Start the Frontend Dashboard
1. Open a **second** new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install any missing dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *You should see `Ready in ...` indicating it has launched. Keep this terminal open!*

### Step 3: Run the Application!
Open your web browser and go to `http://localhost:3000`. You can now upload a PDF resume/marksheet directly into the application!
"# CAREER_NOVA_AI" 
