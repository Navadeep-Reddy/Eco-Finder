const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;
const healthRouter = require('./src/router')

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
  };

// Apply CORS middleware before other middleware
app.use(cors(corsOptions))

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Other middleware
app.use(express.json());

app.use("/health/api/v1", healthRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
