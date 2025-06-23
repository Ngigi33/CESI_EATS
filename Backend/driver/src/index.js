//const {app} = require("./index.js");
const port = 4004;

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');

require('dotenv').config();

app.use(cors());
app.use(express.json());
db.connectDB();
 
router = require('./router/routes')(app);
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, async()=>{
    console.log('Server is running on port', {port});
})