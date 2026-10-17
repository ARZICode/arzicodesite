import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './CaseStudies.css';

export default function CaseStudies() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/user/case-studies`);
      if (!res.ok) throw new Error('Failed to fetch case studies');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="case-studies" className="case-studies-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Featured Case Studies & Projects</h2>
          <p>Explore our recent digital engineering triumphs and bespoke implementations.</p>
        </div>

        {loading && (
          <div className="status-container">
            <div className="spinner"></div>
            <p>Loading portfolio projects...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>⚠️ {error}</p>
            <button onClick={fetchProjects} className="btn-retry">Retry</button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="empty-container">
            <p>No case studies currently available.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="case-studies-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                {project.image_url ? (
                  <div className="project-image">
                    <img src={project.image_url} alt={project.title} />
                  </div>
                ) : (
                  <div className="project-image-placeholder">No Image</div>
                )}
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-category">{project.category || 'Digital Solution'}</span>
                    {project.client_name && <span className="project-client">Client: {project.client_name}</span>}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  {project.results_summary && (
                    <div className="results-box">
                      <strong>Impact / Results:</strong>
                      <p>{project.results_summary}</p>
                    </div>
                  )}

                  {project.project_url && (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Live Project ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}