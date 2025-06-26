import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de gestion de menu',
      version: '1.0.0',
      description: 'Documentation Swagger pour ton API Node.js',
    },
    servers: [
      {
        url: 'http://localhost:4002',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
export default swaggerSpecs;
