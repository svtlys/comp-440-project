import React, { useState, useEffect } from 'react';
// Import API functions for authors
import {
  fetchAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './api/api';

// Import CSS and icons
import './AuthorPage.css';
import {
  FaBookOpen, FaUser, FaSearch, FaThLarge, FaListUl,
  FaUsers, FaCalendarAlt, FaFileAlt, FaUniversity, FaBuilding
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function AuthorPage() {
  // List of all authors
  const [authors, setAuthors] = useState([]);

  // Data for the form fields
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    department: '',
    email: '',
    address: '',
    homepage: '',
  });

  // Tracks the author being edited (null if adding new)
  const [editingId, setEditingId] = useState(null);

  // Controls the slide-in drawer for viewing publications
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerPublications, setDrawerPublications] = useState([]);
  const [drawerAuthorName, setDrawerAuthorName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Controls drawer sort order (ascending by default)
  const [sortDrawerAsc, setSortDrawerAsc] = useState(true);

  // Controls card or list view toggle
  const [viewType, setViewType] = useState('card');

  // Tracks which field we're sorting by (name or institution)
  const [sortOption, setSortOption] = useState('name-asc');

  // Hook for page navigation
  const navigate = useNavigate();

  // Load all authors when the page first loads
  useEffect(() => {
    loadAuthors();
  }, []);

  // Fetch authors from backend
  const loadAuthors = async () => {
    const data = await fetchAuthors();
    setAuthors(data);
  };

  // Handle typing in form inputs
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form to create or update author
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateAuthor(editingId, formData);
    } else {
      await createAuthor(formData);
    }

    // Reset form after submit
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

  // Load author data into form for editing
  const handleEdit = (author) => {
    setFormData(author);
    setEditingId(author.idAuthor);
  };

  // Delete an author
  const handleDelete = async (id) => {
    await deleteAuthor(id);
    loadAuthors();
  };

  // Show drawer with a list of publications by that author
  const handleViewPublications = async (author) => {
    try {
      const res = await fetch(`http://localhost:8080/api/publications/author/${author.idAuthor}`);
      const data = await res.json();
      const sorted = [...data].sort((a, b) =>
        sortDrawerAsc ? a.year - b.year : b.year - a.year
      );
      setDrawerPublications(sorted);
      setDrawerAuthorName(author.name);
      setDrawerVisible(true);
    } catch (err) {
      console.error("Error loading publications:", err);
    }
  };


  // Toggle between ascending and descending sort
  const toggleSort = (field) => {
    if (sortOption.startsWith(field)) {
      setSortOption(prev => prev.endsWith('asc') ? `${field}-desc` : `${field}-asc`);
    } else {
      setSortOption(`${field}-asc`);
    }
  };

  // Sort authors based on selected field and order
  const sortedAuthors = [...authors].sort((a, b) => {
    const valA = a[sortOption.split('-')[0]]?.toLowerCase() || '';
    const valB = b[sortOption.split('-')[0]]?.toLowerCase() || '';
    if (valA < valB) return sortOption.endsWith('asc') ? -1 : 1;
    if (valA > valB) return sortOption.endsWith('asc') ? 1 : -1;
    return 0;
  });

  return (
      <div className="publication-page">
        {/* 🔹 NAVIGATION BAR */}
        <nav className="navbar">
          <div className="content-container navbar-content">
            <div className="navbar-title">Publication Listing Service</div>
            <div className="navbar-links">
              <button className="btn" onClick={() => navigate('/publications')}>
                <FaBookOpen /> Publications
              </button>
              <button className="btn" onClick={() => navigate('/authors')}>
                <FaUser /> Authors
              </button>
              <button className="btn" onClick={() => navigate('/')}>
                <FaSearch /> Search
              </button>
            </div>
          </div>
        </nav>
    

        {/* MAIN CONTENT CONTAINER */}
        <div className="content-container">
          <div className="publication-content-card">
            <h2 className="page-title">Manage Authors</h2>
    
            {/* AUTHOR FORM */}
            <form onSubmit={handleSubmit} className="author-form">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} />
              <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              <input name="homepage" placeholder="Homepage URL" value={formData.homepage} onChange={handleChange} />
    
              {/* Buttons to submit or clear form */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexBasis: '100%' }}>
                <button type="submit" className="btn">
                  {editingId ? 'Update' : 'Add'} Author
                </button>
                <button
                  type="button"
                  className="btn-outline clear-button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      name: '',
                      institution: '',
                      department: '',
                      email: '',
                      address: '',
                      homepage: ''
                    });
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
    
            <hr className="section-divider" />
    
            {/* VIEW/SORT TOOLBAR */}
            <div className="publication-toolbar">
              <h3 className="publication-list-title">Author List</h3>
              <div className="view-sort-options">
                <span>View:</span>
                <button className={`btn-outline ${viewType === 'card' ? 'active' : ''}`} onClick={() => setViewType('card')}>
                  <FaThLarge />
                </button>
                <button className={`btn-outline ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}>
                  <FaListUl />
                </button>
                <span style={{ marginLeft: '20px' }}>Sort:</span>
                <button className={`btn-outline ${sortOption.includes('name') ? 'active' : ''}`} onClick={() => toggleSort('name')}>
                  Name {sortOption.startsWith('name') ? (sortOption.endsWith('asc') ? '↑' : '↓') : ''}
                </button>
                <button className={`btn-outline ${sortOption.includes('institution') ? 'active' : ''}`} onClick={() => toggleSort('institution')}>
                  Institution {sortOption.startsWith('institution') ? (sortOption.endsWith('asc') ? '↑' : '↓') : ''}
                </button>
              </div>
            </div>
    

            {/*AUTHOR LIST DISPLAY */}
            <div className={`publication-list ${viewType === 'list' ? 'list-view' : ''}`}>
              {sortedAuthors.map(author => (
                <div key={author.idAuthor} className="publication-card">
                  <h3>{author.name}</h3>
                  <p><strong>Institution:</strong> {author.institution}</p>
                  <p><strong>Department:</strong> {author.department}</p>
                  <p><strong>Email:</strong> {author.email}</p>
                  <p><strong>Address:</strong> {author.address}</p>
                  <p><strong>Homepage:</strong> <a href={author.homepage} target="_blank" rel="noreferrer">{author.homepage}</a></p>
                  <div className="card-buttons">
                    <button className="edit" onClick={() => handleEdit(author)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(author.idAuthor)}>Delete</button>
                    <button className="view" onClick={() => handleViewPublications(author)}>Publications</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    


        {/*SLIDE-IN DRAWER FOR AUTHOR'S PUBLICATIONS */}
        {drawerVisible && (
          <div className="drawer-overlay" onClick={() => setDrawerVisible(false)}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
              <button className="drawer-close" onClick={() => setDrawerVisible(false)}>×</button>
              <h3>Publications by {drawerAuthorName}</h3>
              <button
                className="btn-outline"
                onClick={() => {
                  setSortDrawerAsc(prev => !prev);
                  setDrawerPublications(prev => [...prev].sort((a, b) =>
                    !sortDrawerAsc ? a.year - b.year : b.year - a.year
                  ));
                }}
                style={{ marginBottom: '10px' }}
              >
                Sort by Year {sortDrawerAsc ? '↓' : '↑'}
              </button>
    
    
              {/* 🔹 List of clickable publications */}
              <ul className="drawer-pub-list">
                {drawerPublications.length > 0 ? (
                  drawerPublications.map(pub => (
                    <li
                      key={pub.id}
                      style={{ cursor: 'pointer', color: '#2c5de5', textDecoration: 'underline' }}
                      onClick={() => {
                        setModalContent(pub);
                        setShowModal(true);
                      }}
                    >
                      <strong>{pub.title}</strong> ({pub.year})
                    </li>
                  ))
                ) : (
                  <li>No publications found.</li>
                )}
              </ul>
            </div>
          </div>
        )}
    


        {/* MODAL POPUP WHEN CLICKING A PUBLICATION */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              <h3><FaBookOpen style={{ marginRight: '8px' }} />{modalContent.title}</h3>
              <p><FaUsers style={{ marginRight: '8px' }} /><strong>Authors:</strong> {modalContent.authorEntities?.map(a => a.name).join(', ')}</p>             
              <p><FaCalendarAlt style={{ marginRight: '8px' }} /><strong>Year:</strong> {modalContent.year}</p>
              <p><FaFileAlt style={{ marginRight: '8px' }} /><strong>Pages:</strong> {modalContent.pages}</p>
              <p><FaUniversity style={{ marginRight: '8px' }} /><strong>Institution:</strong> {modalContent.institution}</p>
              <p><FaBuilding style={{ marginRight: '8px' }} /><strong>Department:</strong> {modalContent.department}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default AuthorPage;