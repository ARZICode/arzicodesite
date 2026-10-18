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
import { Analytics } from "@vercel/analytics/react"; // <-- Fixed import path for React

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
      return (
        <>
          <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          <Analytics /> {/* Optional: include here too if you want analytics on admin login */}
        </>
      );
    }
    return (
      <>
        <AdminDashboard onLogout={() => { localStorage.removeItem('arzicode_token'); setIsAuthenticated(false); window.location.hash = ''; }} />
        <Analytics />
      </>
    );
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
      <Analytics /> {/* Placed safely inside the main layout wrapper */}
    </div>
  );
}