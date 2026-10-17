import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const SERVICE_ID = 'service_bjpm26c';
    const TEMPLATE_ID = 'template_cw1ck9a';
    const PUBLIC_KEY = '89TSMtViRistHTI7a';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setLoading(false);
          setSubmitted(true);
        },
        (error) => {
          console.error('EmailJS Error:', error.text);
          setLoading(false);
          setErrorMsg('Failed to send message. Please email us directly at arzicodelb@gmail.com');
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="contact-badge">Start Your Project</span>
            <h2>Let's build something exceptional together.</h2>
            <p>
              Have a web application idea, e-commerce platform, or custom business management system in mind? Get in touch with our engineering team.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email Us Directly:</strong>
                <a href="mailto:arzicodelb@gmail.com">arzicodelb@gmail.com</a>
              </div>
              <div className="contact-item">
                <strong>Location:</strong>
                <p>Lebanon</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-message">
                <h3>Thank you for reaching out!</h3>
                <p>Your message has been sent successfully. We will get back to you shortly at our earliest convenience.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary" style={{marginTop: '1.5rem'}}>Send Another Message</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <h3>Send Us a Message</h3>
                
                {errorMsg && (
                  <div style={{ color: '#d9534f', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="from_name"
                    required 
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="from_email"
                    required 
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Details / Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="4" 
                    required 
                    placeholder="Tell us about your project goals..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}