import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { LayoutDashboard, Briefcase, MessageSquare, FolderKanban, LogOut, Plus, Trash2, Edit, X } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servRes, revRes, caseRes] = await Promise.all([
        api.get('/admin/services'),
        api.get('/admin/reviews'),
        api.get('/admin/case-studies'),
      ]);
      setServices(servRes.data);
      setReviews(revRes.data);
      setCaseStudies(caseRes.data);
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('arzicode_token');
    navigate('/admin/login');
  };

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.delete(`/admin/${endpoint}/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const openAddModal = () => {
    setEditItem(null);
    setFormData({});
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setFormData(item);
    setImageFile(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      let endpoint = activeTab;
      if (editItem) {
        await api.put(`/admin/${endpoint}/${editItem.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post(`/admin/${endpoint}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving record');
    }
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
          <div className="admin-sidebar-header">
            <LayoutDashboard className="w-6 h-6 text-[#A7BFA6]" />
            <span>Admin Console</span>
          </div>
          <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => setActiveTab('services')} className={`admin-nav-btn ${activeTab === 'services' ? 'active' : ''}`}>
              <Briefcase className="w-5 h-5" />
              <span>Services</span>
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`admin-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`}>
              <MessageSquare className="w-5 h-5" />
              <span>Reviews</span>
            </button>
            <button onClick={() => setActiveTab('case-studies')} className={`admin-nav-btn ${activeTab === 'case-studies' ? 'active' : ''}`}>
              <FolderKanban className="w-5 h-5" />
              <span>Case Studies</span>
            </button>
          </nav>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #2E5B3F' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', color: '#f43f5e', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '5rem', borderBottom: '1px solid #2E5B3F', backgroundColor: 'rgba(27, 61, 42, 0.6)', backdropFilter: 'blur(12px)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', color: '#E2EAD6' }}>{activeTab.replace('-', ' ')}</h1>
          <button onClick={openAddModal} style={{ padding: '0.625rem 1.25rem', borderRadius: '0.75rem', backgroundColor: '#4F7A5B', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </header>

        <div style={{ padding: '2rem', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#A7BFA6', fontFamily: 'monospace' }}>Fetching records...</div>
          ) : (
            <div className="admin-table-container">
              <table style={{ width: '100%', textLeft: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '1rem' }}>ID / Name</th>
                    <th style={{ textAlign: 'left', padding: '1rem' }}>Title / Category</th>
                    <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'services' ? services : activeTab === 'reviews' ? reviews : caseStudies).map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: '1rem', fontWeight: 700, color: '#ffffff' }}>{item.id || item.name}</td>
                      <td style={{ padding: '1rem', color: '#A7BFA6' }}>{item.title || item.role}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={() => openEditModal(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#2E5B3F', border: 'none', color: '#E2EAD6', cursor: 'pointer', marginRight: '0.5rem' }}><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(activeTab, item.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(244, 63, 94, 0.2)', border: 'none', color: '#f43f5e', cursor: 'pointer' }}><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#1B3D2A', border: '1px solid #2E5B3F', borderRadius: '1.25rem', width: '100%', maxWidth: '32rem', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{editItem ? `Edit` : `Add`} Record</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#A7BFA6', cursor: 'pointer' }}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Title / Name" value={formData.title || formData.name || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0D2016', border: '1px solid #2E5B3F', color: '#fff' }} />
              <button type="submit" style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: '#4F7A5B', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}