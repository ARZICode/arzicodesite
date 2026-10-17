import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Cedar3DTree from '../components/CedarTree3D';
import { Sparkles, Code2, CheckCircle2, Star, ExternalLink, Terminal, ShieldCheck, Cpu, Zap, Send, ArrowRight } from 'lucide-react';
import './PublicHome.css';

export default function PublicHome() {
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, caseRes, revRes] = await Promise.all([
          api.get('/user/services'),
          api.get('/user/case-studies'),
          api.get('/user/reviews'),
        ]);
        setServices(servRes.data);
        setCaseStudies(caseRes.data);
        setReviews(revRes.data);
      } catch (err) {
        console.error('Error fetching public data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setContactForm({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0D2016', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A7BFA6', fontFamily: 'monospace' }}>
        <Terminal className="w-8 h-8 animate-pulse mr-3 text-[#E2EAD6]" />
        <span>INITIALIZING ARZICODE SYSTEM...</span>
      </div>
    );
  }

  return (
    <div className="public-home">
      {/* 1. NAVBAR */}
      <nav className="public-nav">
        <div className="public-nav-content">
          <div className="public-logo">
            <div className="public-logo-icon">
              <Code2 className="w-6 h-6 text-[#E2EAD6]" />
            </div>
            <span className="public-logo-text">
              Arzicode<span style={{ color: '#A7BFA6' }}>LB</span>
            </span>
          </div>
          <div className="public-nav-links">
            <a href="#why-us">Why Us</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Case Studies</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="/admin/login" className="admin-portal-btn">Admin Portal</a>
        </div>
      </nav>

      {/* 2. HERO SECTION (+ 3D Cedar Tech Tree Animation based on logo2.png) */}
      <section className="hero-section">
        <div className="section-container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <Sparkles className="w-4 h-4 text-[#A7BFA6]" />
                <span>Next-Gen Enterprise Architecture</span>
              </div>
              <h1 className="hero-title">
                Lebanon's Premier <br />
                <span className="hero-gradient-text">Engineering Hub</span>
              </h1>
              <p className="hero-desc">
                ArzicodeLB merges robust backend database infrastructure with cutting-edge frontend web systems and full cross-platform mobile architectures.
              </p>
              <div className="hero-actions">
                <a href="#services" className="primary-btn">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="secondary-btn">Start Project</a>
              </div>
            </div>

            {/* 3D Interactive Tech Cedar Canvas */}
            <div>
              <Cedar3DTree />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY US SECTION (Static) */}
      <section id="why-us" className="why-us-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ArzicodeLB</h2>
            <p className="section-subtitle">Delivering high-throughput software systems built for scaling businesses.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-box"><Cpu className="w-6 h-6" /></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>High Performance</h3>
              <p style={{ marginTop: '0.5rem', color: '#A7BFA6', fontSize: '0.9rem', lineHeight: '1.6' }}>Optimized RESTful APIs, clean database normalization, and blazing-fast frontend rendering.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><ShieldCheck className="w-6 h-6" /></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Enterprise Security</h3>
              <p style={{ marginTop: '0.5rem', color: '#A7BFA6', fontSize: '0.9rem', lineHeight: '1.6' }}>JWT authentication, strict encryption protocols, and verified backend middleware guardrails.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><Zap className="w-6 h-6" /></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Agile Execution</h3>
              <p style={{ marginTop: '0.5rem', color: '#A7BFA6', fontSize: '0.9rem', lineHeight: '1.6' }}>Rapid deployment cycles with modular component architectures and structured documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (Backend-Driven)[cite: 3, 7, 8] */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Backend-Powered Services</h2>
            <p className="section-subtitle">Real-time dynamic service offerings loaded directly from the database.</p>
          </div>
          <div className="card-grid-3">
            {services.map((service) => (
              <div key={service.id} className="standard-card">
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#0D2016', color: '#A7BFA6', border: '1px solid #2E5B3F' }}>
                    {service.badge}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '1.25rem' }}>{service.title}</h3>
                  <p style={{ fontSize: '1.85rem', fontWeight: 900, color: '#E2EAD6', marginTop: '0.3rem' }}>${service.price}</p>
                  <p style={{ marginTop: '1rem', color: '#A7BFA6', fontSize: '0.9rem', lineHeight: '1.6' }}>{service.description}</p>
                  
                  {service.what_you_get && service.what_you_get.length > 0 && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {service.what_you_get.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#E2EAD6' }}>
                          <CheckCircle2 className="w-4 h-4 text-[#A7BFA6]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <a href="#contact" className="primary-btn" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                  {service.action_text || 'Book Service'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES SECTION (Backend-Driven)[cite: 3, 7, 8] */}
      <section id="portfolio" className="portfolio-section" style={{ backgroundColor: '#1B3D2A', borderTop: '1px solid #2E5B3F' }}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Case Studies</h2>
            <p className="section-subtitle">Proven systems delivered across industries.</p>
          </div>
          <div className="card-grid-2">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="standard-card" style={{ backgroundColor: '#0D2016' }}>
                {cs.image_url && (
                  <div style={{ height: '15rem', overflow: 'hidden', borderRadius: '0.85rem', marginBottom: '1.25rem', backgroundColor: '#1B3D2A' }}>
                    <img src={`http://localhost:5000${cs.image_url}`} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A7BFA6', textTransform: 'uppercase' }}>{cs.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#A7BFA6', fontFamily: 'monospace' }}>{cs.client_name}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{cs.title}</h3>
                  <p style={{ marginTop: '0.5rem', color: '#A7BFA6', fontSize: '0.9rem', lineHeight: '1.6' }}>{cs.description}</p>
                  {cs.results_summary && (
                    <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: '0.75rem', backgroundColor: '#1B3D2A', border: '1px solid #2E5B3F', color: '#E2EAD6', fontSize: '0.85rem' }}>
                      <strong>Results:</strong> {cs.results_summary}
                    </div>
                  )}
                </div>
                {cs.project_url && (
                  <a href={cs.project_url} target="_blank" rel="noreferrer" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#A7BFA6', textDecoration: 'none', fontWeight: 600 }}>
                    <span>Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION (Backend-Driven)[cite: 3, 7, 8] */}
      <section id="reviews" className="reviews-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">Verified feedback from our partners.</p>
          </div>
          <div className="card-grid-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="standard-card">
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', color: '#A7BFA6', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_, i) => <Star className="w-4 h-4 fill-current" key={i} />)}
                  </div>
                  <p style={{ color: '#E2EAD6', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.6' }}>"{rev.quote}"</p>
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #2E5B3F' }}>
                  <p style={{ fontWeight: 800, color: '#ffffff' }}>{rev.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#A7BFA6', marginTop: '0.2rem' }}>{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION (Static) */}
      <section id="contact" className="contact-section" style={{ backgroundColor: '#1B3D2A', borderTop: '1px solid #2E5B3F' }}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">Have a project in mind? Let's build it together.</p>
          </div>

          <div className="contact-card">
            {submitted && (
              <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#0D2016', border: '1px solid #4F7A5B', color: '#E2EAD6', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 600 }}>
                Message sent successfully! We will get back to you shortly.
              </div>
            )}
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A7BFA6', marginBottom: '0.5rem' }}>Your Name</label>
                <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="form-input" placeholder="e.g., Angy Saleh" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A7BFA6', marginBottom: '0.5rem' }}>Your Email</label>
                <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="form-input" placeholder="name@domain.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A7BFA6', marginBottom: '0.5rem' }}>Project Details</label>
                <textarea rows="4" required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="form-textarea" placeholder="Tell us about your web, mobile, or backend requirements..." />
              </div>
              <button type="submit" className="primary-btn" style={{ justifyContent: 'center', cursor: 'pointer', border: 'none', marginTop: '0.5rem' }}>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ArzicodeLB. Built with precision software engineering.</p>
      </footer>
    </div>
  );
}