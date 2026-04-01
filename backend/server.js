const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careernova')
  .then(() => console.log('✅ MongoDB Compass Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('CareerNova API is Running'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
