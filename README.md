# Chatting-App-MERN 🗨️

<div align="center">

**A real-time chat application built with the MERN stack and Socket.IO.**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-yellowgreen)](https://socket.io/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://auramic-chatting.onrender.com)

</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview
Chatting-App-MERN is a full-featured real-time messaging application that allows users to register, log in, and communicate instantly. The application leverages Socket.IO for live messaging and MongoDB for persistent chat history storage.

**Live Demo:** [https://auramic-chatting.onrender.com](https://auramic-chatting.onrender.com)

## ✨ Features
- 🔐 **User Authentication**: Secure sign up, login, and logout using JWT
- 💬 **Real-time Messaging**: Instant message delivery with Socket.IO
- 💾 **Chat History**: Persistent message storage in MongoDB
- 👥 **User Management**: User profiles and online status
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔔 **Real-time Notifications**: Get notified of new messages

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Socket.IO Client** - Real-time communication
- **CSS** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Backend type safety

### Database & Authentication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens (JWT)** - Authentication tokens
- **Bcrypt** - Password hashing

### Development Tools
- **dotenv** - Environment variable management
- **Git** - Version control

## 📁 Project Structure

```
Chatting-App-MERN/
├── frontend/                 # React frontend application
│   ├── src/                 # Source files
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static files
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
│
├── backend/                # Express backend application
│   ├── src/               # Source files
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── socket/        # Socket.IO handlers
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── server.ts      # Server entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── tsconfig.json      # TypeScript configuration
│
├── .gitignore             # Git ignore rules
├── package.json           # Root package.json
└── README.md              # This file
```

## 🚀 Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chatanyapra/Chatting-App-MERN.git
   cd Chatting-App-MERN
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (if any)
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatting_app
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod

   # Or using MongoDB Atlas - update MONGODB_URI in .env
   ```

## 🏃 Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
# From the root directory
npm run dev

# Or run separately:

# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/chatting_app |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `NODE_ENV` | Environment (development/production) | development |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/verify` | Verify JWT token |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| GET | `/api/users/search/:username` | Search users |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Get messages for a user |
| POST | `/api/messages` | Send a message |
| DELETE | `/api/messages/:id` | Delete a message |

### Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Client → Server | New socket connection |
| `disconnect` | Client → Server | Socket disconnected |
| `sendMessage` | Client → Server | Send a new message |
| `receiveMessage` | Server → Client | Receive a new message |
| `userOnline` | Server → Client | User is online |
| `userOffline` | Server → Client | User is offline |

## 🌐 Deployment

The application is deployed on Render:

- **Frontend**: Vercel/Netlify (if separated) or bundled with backend
- **Backend**: [Render](https://render.com) at `https://auramic-chatting.onrender.com`
- **Database**: MongoDB Atlas (cloud database)

### Deployment Steps

1. **Prepare for production**
   ```bash
   # Build frontend
   cd frontend
   npm run build

   # The built files will be in frontend/dist
   ```

2. **Configure production environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_strong_secret_key
   CLIENT_URL=https://your-frontend-url.com
   ```

3. **Deploy to Render**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy as a Web Service

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
   ```
   **Solution**: Ensure MongoDB is running locally or use MongoDB Atlas.

2. **Socket.IO Connection Issues**
   **Solution**: Check CORS configuration and ensure both client and server URLs match.

3. **JWT Authentication Failures**
   **Solution**: Verify JWT secret is consistent between server restarts.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the live demo: [https://auramic-chatting.onrender.com](https://auramic-chatting.onrender.com)

---

<div align="center">

**Built with ❤️ using the MERN Stack**

[![GitHub stars](https://img.shields.io/github/stars/chatanyapra/Chatting-App-MERN?style=social)](https://github.com/chatanyapra/Chatting-App-MERN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chatanyapra/Chatting-App-MERN?style=social)](https://github.com/chatanyapra/Chatting-App-MERN/network/members)

</div>
