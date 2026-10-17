import React from 'react';
import './WhyUs.css';

export default function WhyUs() {
  const benefits = [
    {
      title: "Tailored Solutions",
      description: "Built meticulously around the precise operational workflows and distinct objectives of your business.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      )
    },
    {
      title: "Modern Technology",
      description: "Thoughtful, clean, maintainable architecture leveraging the cutting-edge of web and mobile ecosystems.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      )
    },
    {
      title: "Business-Focused Thinking",
      description: "Every module and user journey is engineered to maximize conversion, efficiency, and real-world value.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
      )
    },
    {
      title: "Long-Term Value",
      description: "Relentless focus on rock-solid reliability, security, scalability, and seamless future expansion.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      )
    }
  ];

  return (
    <section id="why-us" className="why-us-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Why Partner With ARZICode</h2>
          <p>Excellence, precision, and dedication embedded in every line of code.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((b, idx) => (
            <div className="benefit-card" key={idx}>
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}