const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Use routes
app.use('/students', studentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Student Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});