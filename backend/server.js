const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vaccinationDB';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err.message));

let users = [];

const names = [
  "Amit Sharma", "Priya Singh", "Rahul Verma", "Neha Gupta",
  "Rohit Kumar", "Anjali Mehta", "Vikas Yadav", "Sneha Patel",
  "Arjun Reddy", "Pooja Das"
];

// generate data
for (let i = 1; i <= 120; i++) {
  users.push({
    id: i,
    name: names[Math.floor(Math.random() * names.length)] + " " + i,
    vaccinated: Math.random() > 0.2,
    age: Math.floor(Math.random() * 60) + 18,
    dose: Math.random() > 0.5 ? "Fully Vaccinated" : "Partially Vaccinated",
    date: new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toLocaleDateString()
  });
}

// GET
app.get('/api/users', (req, res) => {
  res.json(users);
});

// SEARCH
app.get('/api/users/search/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const result = users.filter(u =>
    u.name.toLowerCase().includes(name)
  );
  res.json(result);
});

// ADD
app.post('/api/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    vaccinated: true,
    age: Math.floor(Math.random() * 60) + 18,
    dose: "Fully Vaccinated",
    date: new Date().toLocaleDateString()
  };

  users.push(newUser);
  res.json(newUser);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);