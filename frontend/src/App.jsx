import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('arzicode_token'));

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
    return <AdminDashboard onLogout={() => { localStorage.removeItem('arzicode_token'); setIsAuthenticated(false); window.location.hash = ''; }} />;
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <CaseStudies />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}