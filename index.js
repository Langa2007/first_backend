const express = require('express');
const app = express();
const pool = require('./db/connect');

// Middleware to allow JSON parsing
app.use(express.json());
app.get('/users-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Test route error:', error.message);
    res.status(500).json({ error: 'Failed to fetch users table' });
  }
});


// Root route to test server
app.get('/', (req, res) => {
  res.send('🎉 Hello from your first Node.js + PostgreSQL project!');
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password,created_at) VALUES ($1, $2, $3,NOW()) RETURNING *',
      [username, email, password,]
    );

    res.status(201).json({
      message: '✅ User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
  console.error('🔍 Full Error:', error); // shows full error object
  res.status(500).json({ message: '❌ Error registering user' });
}
});
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Test route error:', error.message)
    res.status(500).json({ message: '❌ Error fetching users' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
