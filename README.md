# CodeX - Online Code Editor Platform

![CodeX Dashboard](./screenshots/dashboard.png)

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **Multi-language Support**: JavaScript, Python, Java, C, C++
- **Real-time Code Execution**: See results instantly
- **User Authentication**: Secure login/signup system
- **Profile Management**: View and edit your profile
- **Responsive Design**: Works on all devices
- **Syntax Highlighting**: Clean code visualization
- **Error Handling**: Clear execution feedback

## Technologies

### Frontend
- React.js (v18+)
- Monaco Editor (VS Code editor)
- Tailwind CSS (v3+)
- React Icons
- Axios for API calls

### Backend
- Node.js (v16+)
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- CORS middleware

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codex.git
cd codex

cd backend
npm install

cd ../frontend
npm install

PORT=7878
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET_KEY=your_secure_jwt_secret