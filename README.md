# 💻 CodeRush
CodeRush💡  —  Make every second of coding count.

## 📚 Table of Contents
- [About](#-about-coderush)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Folder Structure](#-folder-structure)
- [API Documentation](#-api-documentation)
- [License](#-license)

## 🚀 About CodeRush
CodeRush is a gamified competitive programming platform designed to make coding challenges more engaging, rewarding, and performance-driven.

Once users sign up, they gain access to a curated list of coding problems. Each problem can be attempted only once, adding a strategic layer to the challenge. Users submit their solutions through a built-in code editor. If the solution passes all test cases, points are awarded based on the efficiency and optimization of the code — ranging from 1 to 10.

The platform features a real-time leaderboard that highlights the top scorers. The top three users earn Gold, Silver, and Bronze badges, encouraging healthy competition and continuous improvement.

Whether you're looking to sharpen your problem-solving skills or prove your coding speed and efficiency, CodeRush is the place to test your limits.

## 👨‍💻 Tech Stack 
**Frontend:** React, Tailwind CSS, React Query  
**Backend:** Node.js, Express  
**Database:** PostgreSQL, Prisma (ORM)  
**Other:** JWT, Judge0, Axios

## ✨ Features

- ✅ **User Authentication** — Secure sign-up and login system using JWT.
- 📚 **Problem Library** — A curated list of coding challenges across various difficulty levels.
- ⛔ **One-Time Attempt** — Solve each problem only once to ensure fairness.
- 🧠 **Smart Scoring System** — Scores from 1 to 10 based on optimization.
- 🧪 **Dynamic Test Cases** — Sample test cases for real-time evaluation.
- 🖊 **Integrated Code Editor** — Write, edit, and run code in-browser.
- 🏆 **Leaderboard** — Shows top scorers with Gold/Silver/Bronze badges.
- 📊 **Performance Tracking** — Track your coding progress and score.
- 🎨 **Responsive UI** — Optimized for all device sizes.
- 🔒 **Protected Routes** — Only accessible after login.
- ⚙ **RESTful APIs** — Scalable backend structure.

## 📸 Screenshots

![home-1](https://github.com/user-attachments/assets/155cdb66-0f4e-4427-8a56-d9fc371b2e90)

![home-2](https://github.com/user-attachments/assets/dabed6dc-e495-4ea1-b6ea-2e8c0759c74b)

![auth-1](https://github.com/user-attachments/assets/e9037d1e-9223-4a59-8259-309bd8598b57)

![auth-2](https://github.com/user-attachments/assets/7f4a59b9-0926-4521-a37c-68126c4cbcca)

![leaderboard](https://github.com/user-attachments/assets/aa6cc773-6f20-40c8-b97a-17db66e56591)

![problems-1](https://github.com/user-attachments/assets/53a135be-f95c-49eb-bec2-fca56ddc7445)

![problems-2](https://github.com/user-attachments/assets/c414e3ae-6595-47c3-a388-9251ded9cb63)

![problems-3](https://github.com/user-attachments/assets/9106d1d6-bc9b-4a22-b313-c94624bc7d27)

## 🚀 Getting Started

To run this project locally, make sure you have **Node.js** installed.

### 🔧 Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

#### 2. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open: http://localhost:5173/

#### 3. Backend Setup

```bash
cd backend
npx tsc         # Compile TypeScript
npm run dev     # Start backend server
```

## 📁 Folder Structure

![folder-structure](https://github.com/user-attachments/assets/70dc7e09-e275-4f4c-86f3-ed608f3cdbda)

## 📘 API Documentation

### 🌐 Base URL
```
http://localhost:3000/api
```
> All routes are prefixed with `/api`

---

### 📦 Authentication

#### 📝 Sign Up
**POST** `/user/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourPassword"
}
```

#### Response
```json
{
  "message": "Success",
  "token": "JWT_TOKEN"
}
```

If user exists:
```json
{
  "message": "User Already Exist !!!"
}
```

#### 🔐 Sign In
**POST** `/user/signin`

```json
{
  "email": "john@example.com",
  "password": "yourPassword"
}
```

#### Response
```json
{
  "message": "Login Successful",
  "token": "JWT_TOKEN"
}
```

Invalid Credentials:
```json
{
  "message": "Invalid Credentials !"
}
```

### 🔒 Protected Routes
Requires `Authorization: Bearer <token>` in headers or token in body.

#### 🧠 Submit Code
**POST** `/user/submit`

```json
{
  "code": "YOUR_CODE_HERE",
  "questionId": "question123",
  "token": "JWT_TOKEN"
}
```

#### Response
```json
{
  "response": {
    "results": [
      {
        "status": "Passed",
        "timeTaken": "0.52s"
      }
    ]
  }
}
```

#### 📄 Get Solved Problems
**GET** `/user/solvedProblems`

```json
{
  "list": ["question1", "question2", "question3"]
}
```

#### 🏆 Get Leaderboard
**GET** `/leaderboard`

```json
{
  "leaderboard": [
    {
      "id": "1",
      "name": "Saish",
      "points": 999
    }
  ]
}
```

#### ⚠️ Common Errors
- **401 Unauthorized**: Missing/Invalid token
- **404 Not Found**: User not found
- **500 Internal Server Error**: Backend failure

## 📄 License

This project is licensed under the MIT License.

---

### MIT License

Copyright (c) 2025 Saish

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.**
