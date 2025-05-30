import React, { useState, useEffect } from 'react';
// Import backend API functions
import {
  fetchPublications,
  createPublication,
  updatePublication,
  deletePublication
} from './api/api';


import './PublicationPage.css';

// Icons and routing
import { FaBookOpen, FaUser, FaSearch, FaThLarge, FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

//Dropdown for selecting multiple authors
import Select from 'react-select';

function PublicationPage() {
  // List of publications from the backend
  const [publications, setPublications] = useState([]);

  //List of all authors (used in multi-select dropdown)
  const [authorsList, setAuthorsList] = useState([]);

  // Tracks which author IDs are selected
  const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);

  //View state (card or list)
  const [viewType, setViewType] = useState('card');

  // Sort state
  const [sortOption, setSortOption] = useState('title-asc');

  //Form data for publication creation/edit
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    pages: '',
    institution: '',
    department: ''
  });

  //Tracks which publication is being edited
  const [editingId, setEditingId] = useState(null);

  //Institution filter state
  const [institutionFilter, setInstitutionFilter] = useState('');
  const allInstitutions = [...new Set(publications.map(pub => pub.institution).filter(Boolean))];

  //Navigation hook
  const navigate = useNavigate();

  // Load data on page mount
  useEffect(() => {
    loadPublications();
    fetch('/api/authors')
      .then(res => res.json())
      .then(data => setAuthorsList(data))
      .catch(err => console.error("Error fetching authors:", err));
  }, []);


  // Fetch all publications
  const loadPublications = async () => {
    const data = await fetchPublications();
    setPublications(data);
  };

  //Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Start editing a publication
  const handleEdit = (pub) => {
    setFormData({
      title: pub.title,
      year: pub.year.toString(),
      pages: pub.pages,
      institution: pub.institution,
      department: pub.department
    });
    setEditingId(pub.idPublication);
    setSelectedAuthorIds(pub.authorEntities?.map(a => a.idAuthor) || []);
  };



  //Delete a publication
  const handleDelete = async (id) => {
    await deletePublication(id);
    loadPublications();
  };

  // Submit form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      authors: '', // optional string
      year: parseInt(formData.year),
      pages: formData.pages ? parseInt(formData.pages) : null,
      institution: formData.institution,
      department: formData.department
    };

    if (editingId) {
      await updatePublication(editingId, payload, selectedAuthorIds);
    } else {
      await createPublication(payload, selectedAuthorIds);
    }

    // Reset form
    setFormData({
      title: '',
      year: '',
      pages: '',
      institution: '',
      department: ''
    });
    setSelectedAuthorIds([]);
    setEditingId(null);
    loadPublications();
  };

  // Filter and sort logic
  const filteredPubs = publications.filter(pub =>
    !institutionFilter || pub.institution === institutionFilter
  );

  const sortedPublications = [...filteredPubs].sort((a, b) => {
    if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
    if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
    if (sortOption === 'year-asc') return a.year - b.year;
    if (sortOption === 'year-desc') return b.year - a.year;
    return 0;
  });



  return (
    <div className="publication-page">
      {/* NAVIGATION BAR */}
      <nav className="navbar">
        <div className="content-container">
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

      {/* MAIN CONTENT */}
      <div className="content-container">
        <div className="publication-content-card">
          <h2 className="page-title">Manage Publications</h2>

          {/*PUBLICATION FORM */}
          <form onSubmit={handleSubmit} className="publication-form">
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

            <Select
              isMulti
              options={authorsList.map(author => ({
                value: author.idAuthor,
                label: `${author.name} — ${author.institution || 'Unknown'}, ${author.department || 'N/A'}`
              }))}
              value={selectedAuthorIds.map(id => {
                const match = authorsList.find(a => a.idAuthor === id);
                return match
                  ? { value: match.idAuthor, label: `${match.name} — ${match.institution || 'Unknown'}, ${match.department || 'N/A'}` }
                  : null;
              }).filter(Boolean)}
              onChange={(selectedOptions) => {
                setSelectedAuthorIds(selectedOptions.map(opt => opt.value));
              }}
              placeholder="Select or search authors..."
              className="author-select"
            />

            <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
            <input name="pages" placeholder="Pages" value={formData.pages} onChange={handleChange} />
            <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} />
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn">
                {editingId ? 'Update' : 'Add'} Publication
              </button>
              <button
                type="button"
                className="btn-outline clear-button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: '',
                    year: '',
                    pages: '',
                    institution: '',
                    department: ''
                  });
                  setSelectedAuthorIds([]);
                }}
              >
                Clear
              </button>
            </div>
          </form>

          <hr className="section-divider" />

          {/*VIEW / SORT / FILTER TOOLBAR */}
          <div className="publication-toolbar">
            <h3 className="publication-list-title">Current Publications</h3>
            <div className="view-sort-options">

              {/* View buttons */}
              <span>View:</span>
              <button className={`btn-outline ${viewType === 'card' ? 'active' : ''}`} onClick={() => setViewType('card')}>
                <FaThLarge />
              </button>
              <button className={`btn-outline ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}>
                <FaListUl />
              </button>


              {/* Sort buttons */}
              <span style={{ marginLeft: '20px' }}>Sort:</span>
              <button className={`btn-outline ${sortOption.includes('title') ? 'active' : ''}`}
                onClick={() =>
                  setSortOption(prev => prev === 'title-asc' ? 'title-desc' : 'title-asc')}
              >
                Title {sortOption.startsWith('title') ? (sortOption.endsWith('asc') ? '↑' : '↓') : ''}
              </button>
              <button className={`btn-outline ${sortOption.includes('year') ? 'active' : ''}`}
                onClick={() =>
                  setSortOption(prev => prev === 'year-asc' ? 'year-desc' : 'year-asc')}
              >
                Year {sortOption.startsWith('year') ? (sortOption.endsWith('asc') ? '↑' : '↓') : ''}
              </button>


              {/* Institution filter dropdown */}
              <span style={{ marginLeft: '20px' }}>Institution:</span>
              <select
                value={institutionFilter}
                onChange={(e) => setInstitutionFilter(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px' }}
              >
                <option value="">All</option>
                {allInstitutions.map((inst, index) => (
                  <option key={index} value={inst}>{inst}</option>
                ))}
              </select>


              {/* Clear filter button */}
              {institutionFilter && (
                <button
                  className="btn-outline"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setInstitutionFilter('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>



          {/*PUBLICATION LIST */}
          <div className={`publication-list ${viewType === 'list' ? 'list-view' : ''}`}>
            {sortedPublications.map(pub => (
              <div key={pub.idPublication} className="publication-card">
                <h3>{pub.title}</h3>
                <p><strong>Authors:</strong> {pub.authorEntities?.map(a => a.name).join(', ')}</p>
                <p><strong>Year:</strong> {pub.year}</p>
                <p><strong>Pages:</strong> {pub.pages}</p>
                <p><strong>Institution:</strong> {pub.institution}</p>
                <p><strong>Department:</strong> {pub.department}</p>
                <div className="card-buttons">
                  <button className="edit" onClick={() => handleEdit(pub)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(pub.idPublication)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationPage;
