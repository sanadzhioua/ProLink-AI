require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Routes
const cvRoutes = require('./routes/cv');
const linkedinRoutes = require('./routes/linkedin');
const githubRoutes = require('./routes/github');
// const generateRoutes = require('./routes/generate');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/cv', cvRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/github', githubRoutes);
// app.use('/api/generate', generateRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'CareerFlow AI Backend' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
