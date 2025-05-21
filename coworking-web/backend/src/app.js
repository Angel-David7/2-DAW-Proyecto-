require('dotenv').config({ path: '../.env' });

const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { swaggerOptions } = require('./swagger');

const app = express();

// 1. HTTP security headers via Helmet
app.use(helmet());

// 2. CORS configuration (including preflight)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // allowed frontends
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.options('*', cors()); // enable preflight for all routes

// 3. Parse incoming JSON bodies
app.use(express.json());

// 4. Swagger documentation endpoint
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// 5. Mount API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/spaces', require('./routes/spaces'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));

// 6. Health check endpoint
app.get('/api/healthz', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 7. Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// 8. Start HTTP server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
