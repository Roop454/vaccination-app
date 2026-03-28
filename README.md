# Vaccination Data Analysis and Visualization

A full-stack web application to manage vaccination records, analyze trends, and visualize data through an interactive dashboard.

This project was built as a practical end-to-end MERN-style application with authentication, data APIs, and chart-based insights.

## Why I Built This

I wanted to build a project that combines:
- real CRUD and search workflows,
- authentication and protected backend logic,
- and data visualization for decision-making.

Vaccination data is a good use case because it includes user management, reporting, and trend analysis in one app.

## Key Features

- User registration and login with JWT-based authentication.
- RESTful APIs for adding and fetching vaccination users.
- Search endpoint to find users by name.
- Dashboard view for vaccination statistics and trend analysis.
- Modern React frontend with routing and reusable components.
- Theme context support for UI mode handling.

## Tech Stack

Frontend:
- React
- React Router
- Axios
- Chart.js + react-chartjs-2
- Framer Motion
- MUI / Bootstrap

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

## Project Structure

```
backend/
  models/
  routes/
  server.js
frontend/
  src/
    components/
    context/
    pages/
```

## Local Setup

### 1) Clone repository

```bash
git clone https://github.com/Roop454/vaccination-app.git
cd vaccination-app
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` using this template:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vaccinationDB
JWT_SECRET=replace_with_a_strong_secret
```

Start backend:

```bash
npm start
```

### 3) Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## API Endpoints

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`

Users:
- `GET /api/users`
- `GET /api/users/search/:name`
- `POST /api/users`

## Demo Script (Interview Friendly)

Use this 5-7 minute flow:

1. Explain problem statement:
   "This app helps track vaccination records and view trends from a dashboard."
2. Show authentication:
   Register and login flow, mention password hashing and JWT.
3. Show dashboard:
   Highlight charts and what insights can be derived.
4. Show user operations:
   Add a new user and then search by name.
5. Explain backend design:
   Route layering, Mongoose model, environment-based secrets.
6. Mention production-minded improvements:
   Input validation, env config, and basic test/build verification.

## What I Improved During Finalization

- Removed hardcoded sensitive values and moved secrets/config to environment variables.
- Added request validation checks in auth routes.
- Added backend and root `.gitignore` files for clean repository management.
- Updated and stabilized frontend test flow.

## Resume-Ready Project Summary

**Vaccination Data Analysis and Visualization | React, Node.js, Express, MongoDB**

- Built a full-stack web application with JWT authentication and REST APIs for vaccination record workflows.
- Developed an interactive dashboard with chart-driven insights and user search/add operations.
- Improved production readiness by introducing environment-based configuration, validation, and tested build flows.

## Future Enhancements

- Role-based access control (admin/viewer).
- Export analytics to CSV/PDF.
- Date-range filtering and advanced dashboard KPIs.
- Deployment with CI/CD and cloud-hosted MongoDB.
