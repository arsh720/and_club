# 📌 Student club task manager

## 📖 Project Overview
A full-stack, interactive Kanban board built to streamline task management. This application allows users to create, track, and organize tasks across different stages of completion. It is designed with a strong emphasis on clean UI/UX paradigms, featuring interactive states, automatic visual priority mapping, and seamless backend database synchronization. 

## ✨ Features Implemented
* **Interactive Task Flow:** Seamlessly move tasks between "To Do", "In Progress", and "Done" states using integrated dropdown controls.
* **Smart UI/UX Design:** To prevent dashboard clutter, bulky task descriptions are hidden behind a smooth hover-triggered pop-up, prioritizing crucial metadata like Assignee and Department at a glance.
* **Visual Priority Mapping:** Tasks are automatically color-coded (Red for High, Yellow for Medium, Green for Low) with a helpful dashboard legend for quick scanning.
* **Conditional Logic Safeguards:** Built-in application logic restricts task deletion exclusively to tasks marked as "Done" to prevent accidental data loss.
* **Fully Responsive UI:** Styled with Tailwind CSS to ensure a cohesive, professional "neo-brutalism" aesthetic with high-contrast borders and hard shadows.
* **Secure Task Deletion:** Integrated full CRUD capabilities with a protected delete function. Users can permanently remove tasks from the database, but the option is conditionally restricted to tasks in the "Done" stage to prevent accidental data loss of active work.

## 🛠️ Technology Stack Used
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js Serverless API Routes (Node.js)
* **Database:** MongoDB Atlas (M0 Cluster), Mongoose ODM
* **Deployment:** Vercel

## ⚙️ Setup Instructions
Follow these steps to run the application on your local development machine:

**1. Clone the repository**
`git clone https://github.com/your-username/your-repo-name.git`
`cd your-repo-name`

**2. Install dependencies**
`npm install`

**3. Set up Environment Variables**
Create a `.env.local` file in the root directory of the project and add your MongoDB connection string:
`MONGODB_URI=your_mongodb_atlas_connection_string_here`

**4. Start the development server**
`npm run dev`

Open http://localhost:3000 with your browser to see the board in action.

## 🚀 Deployment Instructions
This project is optimized for deployment on Vercel. 

1. Push your local repository to GitHub.
2. Log into Vercel (https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. **Critical Step (Environment Variables):** Before clicking deploy, open the "Environment Variables" dropdown in Vercel and add your `MONGODB_URI` string.
5. **Critical Step (Database Access):** Log into your MongoDB Atlas dashboard. Navigate to **Security > Network Access**. Click "Add IP Address" and select **Allow Access From Anywhere** (`0.0.0.0/0`) to ensure Vercel's dynamic serverless functions can reach the database.
6. Click **Deploy**.

## 📸 Screenshots


![Dashboard View](https://1drv.ms/i/c/a3cd4b8385946094/IQB4rycQ-6k8So0Dq0I3DrbCAZxMsEK__xwcNjHEuy6Xtik?e=3tiZKQ)
*The main Kanban dashboard showing color-coded tasks.*

![Hover Feature](https://1drv.ms/i/c/a3cd4b8385946094/IQDGKjxNvgByRrm0miZg-kL7AY-VuOtQASif5g5HCO3VHnY?e=y93HDf)
*The interactive hover pop-up revealing the full task description.*

![Delete Button](https://1drv.ms/i/c/a3cd4b8385946094/IQBbBKFyPYkbQYAHbdsgdPJBAUDe1Pd5WSRUwCgA8y0JWsE?e=pSW15N)
*A delete button to remove the task after it is completed*

## 🚧 Known Limitations & Future Roadmap
* **Pessimistic UI Updates:** The app currently relies on a strict server-first update pattern to ensure data integrity. This means there is a slight network latency (delay) when changing task statuses. A future update will implement an **Optimistic UI** pattern to make drag-and-drop state changes feel instantaneous.
* **Database Connection Limits:** Running on a free-tier MongoDB Atlas cluster limits active connections to 500. Rapid, concurrent testing across multiple users may occasionally trigger serverless cold starts or `504 Gateway Timeouts`. Implementing strict connection pooling is required for scaling.
* **Authentication:** The "Assignee" functionality currently utilizes text-based schemas to demonstrate relational concepts. A production release requires integrating NextAuth.js for secure, token-based user authentication.
* **State Management:** The app utilizes React's built-in `useState` and prop drilling. For a production-scale release, Redux or React Context would be integrated to manage the Kanban board state globally.

