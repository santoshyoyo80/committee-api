const express = require('express');
const sequelize = require('./db');

// Import routes
const committeeRoutes = require('./routes/committee');
const memberRoutes = require('./routes/member');
const memberCommitteesRoutes = require('./routes/member_committees');

const app = express();
app.use(express.json());

// Register routes
app.use('/api/committees', committeeRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/member_committees', memberCommitteesRoutes);

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
