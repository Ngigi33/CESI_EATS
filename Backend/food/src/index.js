//const {app} = require("./index.js");
const port = 4004;

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

require('dotenv').config();

app.use(cors());
app.use(express.json());
db.connectDB();
 
router = require('./router/routes')(app);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "article api",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

const specs = swaggerjsdoc(options);
app.use('/api-docs/food', swaggerui.serve, swaggerui.setup(specs));
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, async()=>{
    console.log('Server is running on port', {port});
})