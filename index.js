const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/faisalabad_fixers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running at http://localhost:' + PORT));
