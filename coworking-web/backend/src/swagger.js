// backend/src/swagger.js
exports.swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GreenWork API',
      version: '1.0.0',
      description: 'Documentación de la API de GreenWork',
    },
    servers: [
      { url: 'http://localhost:4000', description: 'Servidor local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      { bearerAuth: [] },
    ],
  },
  apis: ['./src/routes/*.js'],
};
