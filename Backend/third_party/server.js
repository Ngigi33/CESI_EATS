require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const devRoutes = require('./routes/devRoutes');
const componentRoutes = require('./routes/componentRoutes');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/dev', devRoutes);
app.use('/api/components', componentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(4000, () => console.log("Serveur démarré sur le port 4000")))
  .catch(err => console.log(err));
