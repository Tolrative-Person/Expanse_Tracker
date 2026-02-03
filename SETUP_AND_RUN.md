# Expense Tracker - Setup & Run Guide

This is a full-stack expense tracking application with a Node.js/Express backend and React frontend.

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd Backend
```

### 2. Install Dependencies
Dependencies are already installed. If needed, run:
```bash
npm install
```

### 3. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and create a new cluster
3. Create a database user and get your connection string
4. Update the `.env` file in the Backend folder:

```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/expanse_tracker?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

Replace:
- `your_username` - Your MongoDB database user
- `your_password` - Your password (URL encode special characters)
- `cluster0` - Your cluster name

### 4. Start Backend Server
```bash
npm start
```

The backend will start on **http://localhost:5000**

You should see: `Server running on port 5000` and `MongoDB connected`

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd Frontend
```

### 2. Install Dependencies
Dependencies are already installed. If needed, run:
```bash
npm install
```

### 3. Verify .env Configuration

The `.env` file is already configured with:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

The frontend will be available at **http://localhost:5173** (or another port if 5173 is busy)

---

## Running Both Together

### Terminal 1 - Backend:
```bash
cd Backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd Frontend
npm run dev
```

Then open your browser and go to the URL shown in the frontend terminal (usually **http://localhost:5173**)

---

## API Endpoints

The backend provides the following REST API endpoints:

### GET all expenses
```bash
GET /api/expenses
```

### CREATE a new expense
```bash
POST /api/expenses
Content-Type: application/json

{
  "description": "Lunch at cafe",
  "amount": 15.50,
  "category": "Food"
}
```

### GET a single expense
```bash
GET /api/expenses/:id
```

### UPDATE an expense
```bash
PUT /api/expenses/:id
Content-Type: application/json

{
  "description": "Updated description",
  "amount": 20.00,
  "category": "Food"
}
```

### DELETE an expense
```bash
DELETE /api/expenses/:id
```

---

## Using the Application

1. **View Expenses**: On the "Daily Expenses" tab, all your expenses are displayed
2. **Add Expense**: Click "+ Add Expense" button to open the form
3. **Edit Expense**: Click the "Edit" button on any expense to modify it
4. **Delete Expense**: Click the "Delete" button to remove an expense
5. **See Total**: Your total expenses are shown at the top

---

## Expense Categories

Available categories:
- Food
- Transport
- Entertainment
- Shopping
- Bills
- Other

---

## Environment Variables

### Backend (.env)
- `MONGO_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

---

## Troubleshooting

### MongoDB Connection Failed
- Check your MONGO_URI in `.env` is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

### Frontend can't connect to Backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in Frontend `.env`
- Check browser console for CORS errors

### Port Already in Use
- Change PORT in Backend `.env` (e.g., 5001)
- Backend will show which port it's using

---

## Project Structure

```
Expanse_Tracker/
├── Backend/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   ├── models/
│   │   └── Expense.js
│   └── routes/
│       └── expenses.js
└── Frontend/
    ├── .env
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── styles.css
        ├── components/
        │   ├── Header.jsx
        │   ├── ProfileMenu.jsx
        │   └── DailyExpenses.jsx
        └── services/
            └── expenseAPI.js
```

---

## Next Steps

- Customize categories based on your needs
- Add authentication for multi-user support
- Add filtering and search functionality
- Deploy to production (Heroku for backend, Vercel for frontend)
- Add data analytics and charts

---

Happy tracking! 🎉
