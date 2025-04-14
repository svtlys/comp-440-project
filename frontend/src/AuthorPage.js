import React, { useState, useEffect } from 'react';
import {
  fetchAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './api/api'; // update these in your api file!
import './PublicationPage.css';
import { FaBookOpen, FaUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    department: '',
    email: '',
    address: '',
    homepage: '',
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    const data = await fetchAuthors();
    setAuthors(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateAuthor(editingId, formData);
    } else {
      await createAuthor(formData);
    }
    setFormData({
      name: '',
      institution: '',
      department: '',
      email: '',
      address: '',
      homepage: ''
    });
    setEditingId(null);
    loadAuthors();
  };
  

  const handleEdit = (author) => {
    setFormData(author);
    setEditingId(author.idAuthor);
  };

  const handleDelete = async (id) => {
    await deleteAuthor(id);
    loadAuthors();
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
        <h2>Manage Authors</h2>

        <form onSubmit={handleSubmit} className="publication-form">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="homepage" placeholder="Homepage URL" value={formData.homepage} onChange={handleChange} />
          <button type="submit">{editingId ? 'Update' : 'Add'} Author</button>
        </form>

        <h3 className="publication-list-title">Author List</h3>

        <div className="publication-list">
          {authors.map(author => (
            <div key={author.idAuthor} className="publication-card">
              <h3>{author.name}</h3>
              <p><strong>Institution:</strong> {author.institution}</p>
              <p><strong>Department:</strong> {author.department}</p>
              <p><strong>Email:</strong> {author.email}</p>
              <p><strong>Address:</strong> {author.address}</p>
              <p><strong>Homepage:</strong> <a href={author.homepage} target="_blank" rel="noreferrer">{author.homepage}</a></p>
              <button onClick={() => handleEdit(author)}>Edit</button>
              <button onClick={() => handleDelete(author.idAuthor)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
