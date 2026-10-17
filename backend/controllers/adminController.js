const pool = require('../config/db');

// Helper to convert multer memory buffer to Base64 data URL
const formatBase64 = (file) => {
  if (!file) return null;
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

// Services
exports.getAllServices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ error: 'Server error fetching services' });
  }
};

exports.addService = async (req, res) => {
  const { id, badge, title, price, description, action_text, what_you_get, ideal_for } = req.body;
  const whatYouGetArray = Array.isArray(what_you_get) ? what_you_get : (what_you_get ? what_you_get.split(',').map(s => s.trim()) : []);
  const idealForArray = Array.isArray(ideal_for) ? ideal_for : (ideal_for ? ideal_for.split(',').map(s => s.trim()) : []);
  const image_url = req.file ? formatBase64(req.file) : '';

  try {
    const query = `
      INSERT INTO services (id, badge, title, price, description, action_text, image_url, what_you_get, ideal_for, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *;
    `;
    const values = [id, badge || 'SERVICE', title, price, description, action_text || 'book website', image_url, whatYouGetArray, idealForArray];
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Service created successfully', service: result.rows[0] });
  } catch (err) {
    console.error('Error adding service:', err.message);
    res.status(500).json({ error: 'Database error creating service: ' + err.message });
  }
};

exports.editService = async (req, res) => {
  const { id } = req.params;
  const { badge, title, price, description, action_text, what_you_get, ideal_for } = req.body;
  const whatYouGetArray = Array.isArray(what_you_get) ? what_you_get : (what_you_get ? what_you_get.split(',').map(s => s.trim()) : []);
  const idealForArray = Array.isArray(ideal_for) ? ideal_for : (ideal_for ? ideal_for.split(',').map(s => s.trim()) : []);

  try {
    const existing = await pool.query('SELECT image_url FROM services WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'Service not found' });

    let image_url = existing.rows[0].image_url;
    if (req.file) {
      image_url = formatBase64(req.file);
    }

    const query = `
      UPDATE services 
      SET badge = $1, title = $2, price = $3, description = $4, action_text = $5, image_url = $6, what_you_get = $7, ideal_for = $8 
      WHERE id = $9 
      RETURNING *;
    `;
    const values = [badge, title, price, description, action_text, image_url, whatYouGetArray, idealForArray, id];
    
    const result = await pool.query(query, values);
    res.json({ message: 'Service updated successfully', service: result.rows[0] });
  } catch (err) {
    console.error('Error updating service:', err.message);
    res.status(500).json({ error: 'Database error updating service: ' + err.message });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err.message);
    res.status(500).json({ error: 'Database error deleting service' });
  }
};

// Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ error: 'Server error fetching reviews' });
  }
};

exports.addReview = async (req, res) => {
  const { quote, name, role, is_visible } = req.body;
  try {
    const query = `INSERT INTO reviews (quote, name, role, is_visible, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *;`;
    const result = await pool.query(query, [quote, name, role, is_visible !== undefined ? is_visible : true]);
    res.status(201).json({ message: 'Review created successfully', review: result.rows[0] });
  } catch (err) {
    console.error('Error adding review:', err.message);
    res.status(500).json({ error: 'Database error creating review' });
  }
};

exports.editReview = async (req, res) => {
  const { id } = req.params;
  const { quote, name, role, is_visible } = req.body;
  try {
    const query = `UPDATE reviews SET quote = $1, name = $2, role = $3, is_visible = $4 WHERE id = $5 RETURNING *;`;
    const result = await pool.query(query, [quote, name, role, is_visible, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review updated successfully', review: result.rows[0] });
  } catch (err) {
    console.error('Error updating review:', err.message);
    res.status(500).json({ error: 'Database error updating review' });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err.message);
    res.status(500).json({ error: 'Database error deleting review' });
  }
};

// Case Studies
exports.getAllCaseStudies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM case_studies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching case studies:', err.message);
    res.status(500).json({ error: 'Server error fetching case studies' });
  }
};

exports.addCaseStudy = async (req, res) => {
  const { id, title, client_name, category, description, results_summary, project_url, is_visible } = req.body;
  const image_url = req.file ? formatBase64(req.file) : '';
  try {
    const query = `
      INSERT INTO case_studies (id, title, client_name, category, description, results_summary, image_url, project_url, is_visible, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
      RETURNING *;
    `;
    const result = await pool.query(query, [id, title, client_name, category, description, results_summary, image_url, project_url, is_visible !== undefined ? is_visible : true]);
    res.status(201).json({ message: 'Case study created successfully', caseStudy: result.rows[0] });
  } catch (err) {
    console.error('Error adding case study:', err.message);
    res.status(500).json({ error: 'Database error creating case study: ' + err.message });
  }
};

exports.editCaseStudy = async (req, res) => {
  const { id } = req.params;
  const { title, client_name, category, description, results_summary, project_url, is_visible } = req.body;
  try {
    const existing = await pool.query('SELECT image_url FROM case_studies WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'Case study not found' });

    let image_url = existing.rows[0].image_url;
    if (req.file) {
      image_url = formatBase64(req.file);
    }

    const query = `
      UPDATE case_studies 
      SET title = $1, client_name = $2, category = $3, description = $4, results_summary = $5, image_url = $6, project_url = $7, is_visible = $8 
      WHERE id = $9 
      RETURNING *;
    `;
    const values = [title, client_name, category, description, results_summary, image_url, project_url, is_visible, id];
    
    const result = await pool.query(query, values);
    res.json({ message: 'Case study updated successfully', caseStudy: result.rows[0] });
  } catch (err) {
    console.error('Error updating case study:', err.message);
    res.status(500).json({ error: 'Database error updating case study: ' + err.message });
  }
};

exports.deleteCaseStudy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM case_studies WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Case study not found' });
    res.json({ message: 'Case study deleted successfully' });
  } catch (err) {
    console.error('Error deleting case study:', err.message);
    res.status(500).json({ error: 'Database error deleting case study' });
  }
};