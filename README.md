# ShopZone E-Commerce Website

A modern 3D animated e-commerce website built with React, Node.js, Express, and MongoDB.

## Project Structure

```
project/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/           # Node.js + Express backend
    ├── config/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Features

- 3D animated product cards with hover effects
- Product catalog with filters
- Shopping cart functionality
- Checkout process
- Responsive design
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB URI in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API URL in `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

1. Start MongoDB on your system
2. Start the backend server (it will auto-seed sample products on first run)
3. Start the frontend development server
4. Open your browser and visit `http://localhost:5173`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `POST /api/seed` - Seed database with sample products

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Build for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
The backend runs as-is in production with Node.js
