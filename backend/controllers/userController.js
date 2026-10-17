const pool = require('../config/db');

exports.getPublicServices = async (req, res) => {
  try {
    const query = `SELECT * FROM services ORDER BY id DESC`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public services:', err.message);
    res.status(500).json({ error: 'Server error fetching services' });
  }
};

exports.getPublicServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM services WHERE id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching service details:', err.message);
    res.status(500).json({ error: 'Server error fetching service details' });
  }
};

exports.getPublicReviews = async (req, res) => {
  try {
    const query = `SELECT * FROM reviews WHERE is_visible = true ORDER BY created_at DESC`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public reviews:', err.message);
    res.status(500).json({ error: 'Server error fetching reviews' });
  }
};

exports.getPublicCaseStudies = async (req, res) => {
  try {
    const query = `SELECT * FROM case_studies WHERE is_visible = true ORDER BY created_at DESC`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public case studies:', err.message);
    res.status(500).json({ error: 'Server error fetching case studies' });
  }
};