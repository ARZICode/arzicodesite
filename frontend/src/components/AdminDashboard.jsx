import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, mode: 'add', type: null, item: null });

  const token = localStorage.getItem('arzicode_token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [sRes, cRes, rRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/services`, { headers }),
        fetch(`${API_BASE_URL}/admin/case-studies`, { headers }),
        fetch(`${API_BASE_URL}/admin/reviews`, { headers })
      ]);

      if (sRes.status === 401 || cRes.status === 401 || rRes.status === 401) {
        onLogout();
        return;
      }

      setServices(await sRes.json());
      setCaseStudies(await cRes.json());
      setReviews(await rRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-logo">ARZICode <span>Admin Dashboard</span></div>
        <button onClick={onLogout} className="btn-logout">Sign Out</button>
      </header>

      <div className="admin-nav-tabs">
        <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>Services ({services.length})</button>
        <button className={activeTab === 'case-studies' ? 'active' : ''} onClick={() => setActiveTab('case-studies')}>Case Studies ({caseStudies.length})</button>
        <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews ({reviews.length})</button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="status-container"><div className="spinner"></div><p>Loading admin records...</p></div>
        ) : (
          <>
            {activeTab === 'services' && (
              <div className="admin-section">
                <div className="section-top">
                  <h3>Manage Services</h3>
                  <button className="btn-primary" onClick={() => setModal({ open: true, mode: 'add', type: 'services', item: null })}>+ Add Service</button>
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Badge</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(s => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td><strong>{s.title}</strong></td>
                          <td>{s.badge}</td>
                          <td>{s.price || 'N/A'}</td>
                          <td>
                            <button onClick={() => setModal({ open: true, mode: 'edit', type: 'services', item: s })} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete('services', s.id)} className="btn-delete">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'case-studies' && (
              <div className="admin-section">
                <div className="section-top">
                  <h3>Manage Case Studies</h3>
                  <button className="btn-primary" onClick={() => setModal({ open: true, mode: 'add', type: 'case-studies', item: null })}>+ Add Project</button>
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Client</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudies.map(c => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td><strong>{c.title}</strong></td>
                          <td>{c.client_name || 'N/A'}</td>
                          <td>{c.category}</td>
                          <td>
                            <button onClick={() => setModal({ open: true, mode: 'edit', type: 'case-studies', item: c })} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete('case-studies', c.id)} className="btn-delete">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="admin-section">
                <div className="section-top">
                  <h3>Manage Reviews</h3>
                  <button className="btn-primary" onClick={() => setModal({ open: true, mode: 'add', type: 'reviews', item: { is_visible: true } })}>+ Add Review</button>
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Quote</th>
                        <th>Visible</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map(r => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td><strong>{r.name}</strong></td>
                          <td>{r.role}</td>
                          <td>{r.quote ? r.quote.substring(0, 50) + '...' : ''}</td>
                          <td>{r.is_visible ? 'Yes' : 'No'}</td>
                          <td>
                            <button onClick={() => setModal({ open: true, mode: 'edit', type: 'reviews', item: r })} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete('reviews', r.id)} className="btn-delete">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {modal.open && modal.type && (
        <AdminModal 
          type={modal.type} 
          mode={modal.mode} 
          item={modal.item} 
          onClose={() => setModal({ open: false, mode: 'add', type: null, item: null })} 
          onSuccess={() => { setModal({ open: false, mode: 'add', type: null, item: null }); fetchData(); }} 
        />
      )}
    </div>
  );
}

function AdminModal({ type, mode, item, onClose, onSuccess }) {
  const [formData, setFormData] = useState(item || {});
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem('arzicode_token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpointKey = type;
    const url = mode === 'edit' 
      ? `${API_BASE_URL}/admin/${endpointKey}/${item?.id}`
      : `${API_BASE_URL}/admin/${endpointKey}`;

    try {
      let res;

      // Reviews do not have images, send as clean JSON
      if (type === 'reviews') {
        res = await fetch(url, {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Services and Case Studies use FormData because they support image uploads
        const data = new FormData();
        for (const key in formData) {
          if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        }
        if (imageFile) data.append('image', imageFile);

        res = await fetch(url, {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: data
        });
      }

      if (res.ok) {
        onSuccess();
      } else {
        const errData = await res.json();
        alert('Error: ' + (errData.error || 'Operation failed'));
      }
    } catch (err) {
      alert('Request error');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>{mode === 'edit' ? `Edit ${type}` : `Add New ${type}`}</h3>
        <form onSubmit={handleSubmit}>
          {type === 'services' && (
            <>
              <div className="form-group"><label>ID (slug)</label><input disabled={mode === 'edit'} required value={formData.id || ''} onChange={e => setFormData({...formData, id: e.target.value})} /></div>
              <div className="form-group"><label>Badge</label><input value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} /></div>
              <div className="form-group"><label>Title</label><input required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
              <div className="form-group"><label>Price</label><input value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
              <div className="form-group"><label>Description</label><textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              <div className="form-group"><label>Action Text</label><input value={formData.action_text || ''} onChange={e => setFormData({...formData, action_text: e.target.value})} /></div>
              <div className="form-group"><label>Image</label><input type="file" onChange={e => setImageFile(e.target.files[0])} /></div>
            </>
          )}

          {type === 'case-studies' && (
            <>
              <div className="form-group"><label>ID (slug)</label><input disabled={mode === 'edit'} required value={formData.id || ''} onChange={e => setFormData({...formData, id: e.target.value})} /></div>
              <div className="form-group"><label>Title</label><input required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
              <div className="form-group"><label>Client Name</label><input value={formData.client_name || ''} onChange={e => setFormData({...formData, client_name: e.target.value})} /></div>
              <div className="form-group"><label>Category</label><input value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
              <div className="form-group"><label>Description</label><textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              <div className="form-group"><label>Results Summary</label><input value={formData.results_summary || ''} onChange={e => setFormData({...formData, results_summary: e.target.value})} /></div>
              <div className="form-group"><label>Project URL</label><input value={formData.project_url || ''} onChange={e => setFormData({...formData, project_url: e.target.value})} /></div>
              <div className="form-group"><label>Image</label><input type="file" onChange={e => setImageFile(e.target.files[0])} /></div>
            </>
          )}

          {type === 'reviews' && (
            <>
              <div className="form-group"><label>Reviewer Name</label><input required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div className="form-group"><label>Role / Company</label><input value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
              <div className="form-group"><label>Quote</label><textarea required value={formData.quote || ''} onChange={e => setFormData({...formData, quote: e.target.value})} /></div>
              <div className="form-group checkbox-group">
                <label><input type="checkbox" checked={formData.is_visible !== false} onChange={e => setFormData({...formData, is_visible: e.target.checked})} /> Visible on website</label>
              </div>
            </>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}