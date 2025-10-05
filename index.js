const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const oneMinute = 60000;
const threeMinutes = 3 * oneMinute;

setInterval(() => {
    console.log('Health check:', new Date().toISOString());
}, threeMinutes);


setInterval(() => {
    console.log('Uptime:', process.uptime());
}, oneMinute);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Deploy Platform!',
        timestamp: new Date().toISOString(),
        version: process.env.APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});


app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});


app.get('/env', (req, res) => {
    // Return some environment variables (be careful not to expose secrets)
    res.json({
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        APP_VERSION: process.env.APP_VERSION,
        // Add other safe environment variables here
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`Sample app listening on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});