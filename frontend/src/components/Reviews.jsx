import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './Reviews.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/user/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="reviews-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <p>What our partners and clients say about collaborating with ARZICode.</p>
        </div>

        {loading && (
          <div className="status-container">
            <div className="spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>⚠️ {error}</p>
            <button onClick={fetchReviews} className="btn-retry">Retry</button>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="empty-container">
            <p>No testimonials available at the moment.</p>
          </div>
        )}
      </div>

      {!loading && !error && reviews.length > 0 && (
        <div className="reviews-marquee-container">
          <div className="reviews-track">
            {/* Render reviews twice to create a seamless infinite loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <div className="review-card" key={`${review.id}-${index}`}>
                <div className="review-quote-icon">“</div>
                <p className="review-text">{review.quote}</p>
                <div className="review-author">
                  <h4>{review.name}</h4>
                  {review.role && <p>{review.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}