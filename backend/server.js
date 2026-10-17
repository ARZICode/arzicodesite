const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // Included your current frontend port
  'https://arzicode-platform.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
const pool = require('./config/db');
app.get('/api/debug-db', async (req, res) => {
  try {
    const info = await pool.query('SELECT current_database() AS db, current_schema() AS schema, inet_server_addr() AS addr');
    const tables = await pool.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema')");
    const counts = {};
    for (const t of ['services', 'reviews', 'case_studies']) {
      try { counts[t] = (await pool.query(`SELECT count(*) FROM ${t}`)).rows[0].count; }
      catch (e) { counts[t] = 'ERR: ' + e.message; }
    }
    res.json({ host: new URL(process.env.DATABASE_URL).host, info: info.rows[0], counts, tables: tables.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  
});