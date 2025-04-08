import React, { useState, useEffect } from 'react';
import {
  fetchPublications,
  createPublication,
  updatePublication,
  deletePublication
} from './api/api';
import './PublicationPage.css';
import { FaBookOpen, FaUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PublicationPage() {
  const [publications, setPublications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: '',
    pages: '',
    institution: '',
    department: '',
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    const data = await fetchPublications();
    setPublications(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePublication(editingId, formData);
    } else {
      await createPublication(formData);
    }
    setFormData({ title: '', authors: '', year: '', pages: '', institution: '', department: '' });
    setEditingId(null);
    loadPublications();
  };

  const handleEdit = (pub) => {
    setFormData(pub);
    setEditingId(pub.id);
  };

  const handleDelete = async (id) => {
    await deletePublication(id);
    loadPublications();
  };

  return (
    <div className="publication-page">
      {/* 🔹 NAVBAR */}
      <nav className="navbar">
        <div className="content-container">
          <div className="navbar-title">Publication Listing Service</div>
          <div className="navbar-links">
            <button onClick={() => navigate('/publications')}>
              <FaBookOpen /> Publications
            </button>
            <button onClick={() => navigate('/authors')}>
              <FaUser /> Authors
            </button>
            <button onClick={() => navigate('/')}>
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </nav>

      {/* 🔹 MAIN CONTENT */}
      <div className="content-container">
        <h2>Manage Publications</h2>

        <form onSubmit={handleSubmit} className="publication-form">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input name="authors" placeholder="Authors" value={formData.authors} onChange={handleChange} required />
          <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
          <input name="pages" placeholder="Pages" value={formData.pages} onChange={handleChange} />
          <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <button type="submit">{editingId ? 'Update' : 'Add'} Publication</button>
        </form>


        <h3 className="publication-list-title">Current Publications</h3>

        <div className="publication-list">
          {publications.map(pub => (
            <div key={pub.id} className="publication-card">
              <h3>{pub.title}</h3>
              <p><strong>Authors:</strong> {pub.authors}</p>
              <p><strong>Year:</strong> {pub.year}</p>
              <p><strong>Pages:</strong> {pub.pages}</p>
              <p><strong>Institution:</strong> {pub.institution}</p>
              <p><strong>Department:</strong> {pub.department}</p>
              <button onClick={() => handleEdit(pub)}>Edit</button>
              <button onClick={() => handleDelete(pub.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicationPage;
