const express = require('express');
const sequelize = require('./db');

const app = express();
app.use(express.json());

// mounts all routes in this file 
app.use('/api/committees', require('./routes/committee'));
app.use('/api/committees', require('./routes/committeeMember'));
app.use('/api/committee-installments', require('./routes/committeeInstallment'));
app.use('/api/member-search', require('./routes/memberSearch'));

// Sync DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('DB connection error:', err));
