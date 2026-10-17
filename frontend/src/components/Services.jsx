import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/user/services`);
      if (!res.ok) throw new Error('Failed to fetch services from server');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Our Professional Services</h2>
          <p>Tailored digital solutions built to elevate your enterprise.</p>
        </div>

        {loading && (
          <div className="status-container">
            <div className="spinner"></div>
            <p>Loading premier services...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>⚠️ {error}</p>
            <button onClick={fetchServices} className="btn-retry">Retry</button>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="empty-container">
            <p>No services currently published.</p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card">
  {/* Render the image if image_url exists */}
  {service.image_url ? (
    <img 
      src={service.image_url} 
      alt={service.title} 
      className="service-card-image" 
    />
  ) : (
    <div className="service-image-placeholder">No Image</div>
  )}

  <span className="service-badge">{service.badge}</span>
  <h3>{service.title}</h3>
  <p>{service.description}</p>
  <div className="service-price">{service.price}</div>
  <button className="btn-action">{service.action_text}</button>
</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}