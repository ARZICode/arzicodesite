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
              <div className="service-card" key={service.id}>
                {service.image_url ? (
                  <div className="service-image-wrapper">
                    <img src={service.image_url} alt={service.title} />
                  </div>
                ) : (
                  <div className="service-image-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                    <span>No Image</span>
                  </div>
                )}

                <div className="service-content">
                  <span className="service-badge">{service.badge}</span>
                  <h3>{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-price">{service.price}</div>

                  {service.what_you_get && service.what_you_get.length > 0 && (
                    <div className="service-tags">
                      <strong>What You Get:</strong>
                      <div className="tag-list">
                        {service.what_you_get.map((item, idx) => (
                          <span className="tag" key={idx}>{item}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="service-action-btn">
                   <a href="#contact" className="service-action-btn">
  {service.action_text || 'Get Started'} ↗
</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}