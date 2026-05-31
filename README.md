<div align="center">
  <img src="https://raw.githubusercontent.com/BAJI-761/DEVGEAR-STORE/main/client/public/favicon.ico" alt="DevConnect Logo" width="100"/>

  # ✏️ DevConnect
  *Where Devs Connect, Sketch, and Build.*

  **A social platform for developers to sketch out ideas, share snippets, and build their network. No corporate polish here. Just a messy, beautiful sketchbook of ideas.**

  [Features](#features) •
  [Tech Stack](#tech-stack) •
  [Getting Started](#getting-started) •
  [Environment Variables](#environment-variables)

</div>

---

## 🎨 The Aesthetic

DevConnect features a unique, **hand-drawn, sketchbook-style UI**. We ditched the generic, sterile borders for "wobbly" CSS borders, `post-it` note backgrounds, and `pencil` & `marker` colored typography. It feels like an authentic notebook for engineers.

> *Built with imperfect pixels.*

---

## 🚀 Features

- 🔐 **Authentication**: Secure JWT-based auth with HTTP-only cookies and silent refresh.
- 💻 **Syntax-highlighted Snippets**: Share your code snippets in your feed with Markdown support.
- 👥 **Developer Network**: Follow other developers, see their sketches, and interact.
- ❤️ **Social Interactions**: Like posts and comment on ideas in real-time.
- 🔔 **Real-time Notifications**: Socket.io integration alerts you instantly when someone likes, comments, or follows you.
- 🖼️ **Image Uploads**: Powered by Cloudinary for blazing fast, optimized image sharing.
- 🎨 **Custom Design System**: Bespoke Tailwind CSS tokens (`pencil`, `marker`, `paper`, `postit`) with hand-drawn structural primitives (wobbly cards, squiggly borders).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v4 (with custom hand-drawn primitives)
- **State Management**: Zustand (Auth state) & TanStack React Query (Server state)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Real-time**: Socket.io-client

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Storage**: Cloudinary & Multer
- **Real-time**: Socket.io

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (Atlas or local)
- Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/BAJI-761/DEVGEAR-STORE.git
cd DEVGEAR-STORE
```

### 2. Install Dependencies
You need to install dependencies for both the frontend and backend.
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Set up Environment Variables
Check the [Environment Variables](#environment-variables) section below for required `.env` values.

### 4. Run the Development Servers
Open two terminal windows.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Your app will be running at `http://localhost:3000`.

---

## 🔑 Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:3000
```

### Frontend (`client/.env`)
Create a `.env` file in the `client` directory (Vite requires the `VITE_` prefix):

```env
VITE_API_URL=http://localhost:5000
```

---

<div align="center">
  <p>Crafted with ❤️ and ☕ by <b>DevConnect</b>.</p>
</div>
