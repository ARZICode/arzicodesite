import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          ARZI<span>Code</span><span className="logo-ext">.lb</span>
        </a>

        <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
        </nav>

        <div className="navbar-actions">
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}