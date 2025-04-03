import React, { useState } from 'react';
import './HomePage.css';
import {
  FaSearch, FaBookOpen, FaUsers, FaCalendarAlt, FaFileAlt,
  FaUniversity, FaBuilding, FaUser, FaEnvelope,
  FaMapMarkerAlt, FaLink
} from 'react-icons/fa';
import ReactSlider from 'react-slider';

function HomePage() {
    // Setting up states for search, filters, and sorting
  const [searchMode, setSearchMode] = useState('Publication');
  const [keyword, setKeyword] = useState('');
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const mockPublications = [
    {
      title: "Efficient Algorithms for Big Data",
      authors: ["Alice Johnson", "Bob Smith"],
      pages: "101-120",
      year: 2023,
      institution: "MIT",
      department: "Computer Science"
    },
    {
      title: "Blockchain Security",
      authors: ["Daniel Zhang"],
      pages: "10-32",
      year: 2021,
      institution: "Stanford University",
      department: "Cybersecurity"
    },
    {
      title: "Quantum Machine Learning",
      authors: ["Emily Stone"],
      pages: "75-92",
      year: 1995,
      institution: "UC Berkeley",
      department: "Physics"
    },
    {
      title: "Scalable Web Architecture",
      authors: ["Arjun Mehta", "Laura Kim"],
      pages: "88-105",
      year: 2023,
      institution: "Georgia Tech",
      department: "Software Engineering"
    },
    {
      title: "Natural Language Processing Trends",
      authors: ["Catherine Lee"],
      pages: "42-61",
      year: 1992,
      institution: "University of Toronto",
      department: "AI Research"
    }
  ];
  
  // Mock data for authors
  const mockAuthors = [
    {
      name: "Alice Johnson",
      institution: "MIT",
      department: "Computer Science",
      email: "alice@mit.edu",
      address: "77 Massachusetts Ave, Cambridge, MA",
      homepage: "https://mit.edu/~alice"
    },
    {
      name: "Daniel Zhang",
      institution: "Stanford University",
      department: "Cybersecurity",
      email: "daniel@stanford.edu",
      address: "450 Serra Mall, Stanford, CA",
      homepage: "https://stanford.edu/~daniel"
    },
    {
      name: "Emily Stone",
      institution: "UC Berkeley",
      department: "Physics",
      email: "estone@berkeley.edu",
      address: "Berkeley, CA 94720",
      homepage: "https://berkeley.edu/~estone"
    },
    {
      name: "Arjun Mehta",
      institution: "Georgia Tech",
      department: "Software Engineering",
      email: "arjun@gatech.edu",
      address: "North Ave NW, Atlanta, GA",
      homepage: "https://gatech.edu/~arjun"
    },
    {
      name: "Catherine Lee",
      institution: "University of Toronto",
      department: "AI Research",
      email: "c.lee@utoronto.ca",
      address: "27 King's College Cir, Toronto, ON",
      homepage: "https://utoronto.ca/~clee"
    }
  ];
  
  // Filter + sort logic for publications
  const filteredPublications = mockPublications.filter(pub => {
    const text = `${pub.title} ${pub.authors.join(' ')}`.toLowerCase();
    const matchesKeyword = keyword === '' || text.includes(keyword.toLowerCase());
    const matchesYearRange = pub.year >= minYear && pub.year <= maxYear;
    return matchesKeyword && matchesYearRange;
  });

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

    // Sort logic for authors
  const sortedAuthors = [...mockAuthors].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // When user clicks a sort button
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Modal stuff for popups
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="content-container">
          <div className="navbar-title">Publication Listing Service</div>
          <div className="navbar-links">
            <button><FaBookOpen /> Publications</button>
            <button><FaUser /> Authors</button>
            <button><FaSearch /> Search</button>
          </div>
        </div>
      </nav>

      <div className="content-container">
        <div className="search-section">
          <h2>Search {searchMode}</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder={`Search by ${searchMode === 'Publication' ? 'title or author' : 'name or institution'}`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button><FaSearch /> Search</button>
          </div>

          <div className="search-tabs-bar">
            <div className="search-tabs">
              <span className={searchMode === 'Publication' ? 'active' : ''} onClick={() => { setSearchMode('Publication'); setSortField('title'); }}>Publication</span>
              <span className={searchMode === 'Author' ? 'active' : ''} onClick={() => { setSearchMode('Author'); setSortField('name'); }}>Author</span>
            </div>
          </div>

          <div className="layout-container">
            <div className="filter-sidebar">
              <div className="filter-section">
                <h4>Keyword</h4>
                <div className="keyword-box">{keyword || '—'}</div>
              </div>
              {searchMode === 'Publication' && (
                <div className="filter-section">
                  <h4>Year Range</h4>
                  <ReactSlider
                    className="year-slider"
                    thumbClassName="year-thumb"
                    trackClassName="year-track"
                    value={[minYear, maxYear]}
                    min={1990}
                    max={2025}
                    step={1}
                    onChange={([min, max]) => {
                      setMinYear(min);
                      setMaxYear(max);
                    }}
                  />
                  <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                    {minYear} - {maxYear}
                  </div>
                </div>
              )}
            </div>

            <div className="results-container">
              <div className="sort-buttons">
                {searchMode === 'Publication' ? (
                  <>
                    <button onClick={() => toggleSort('title')}>
                      Sort by Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button onClick={() => toggleSort('year')}>
                      Sort by Year {sortField === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleSort('name')}>
                      Sort by Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button onClick={() => toggleSort('institution')}>
                      Sort by Institution {sortField === 'institution' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </>
                )}
              </div>

              <div className="search-results">
                {searchMode === 'Publication' ? (
                  sortedPublications.map((pub, index) => (
                    <div key={index} className="result-card">
                      <h3 className="result-title" onClick={() => openModal(pub)}>{pub.title}</h3>
                      <p><strong>Authors:</strong> {pub.authors.join(', ')}</p>
                      <p><strong>Year:</strong> {pub.year}</p>
                    </div>
                  ))
                ) : (
                  sortedAuthors.map((author, index) => (
                    <div key={index} className="result-card">
                      <h3 className="result-title" onClick={() => openModal(author)}>{author.name}</h3>
                      <p><strong>Institution:</strong> {author.institution}</p>
                      <p><strong>Homepage:</strong> <a href={author.homepage} target="_blank" rel="noopener noreferrer">{author.homepage}</a></p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>×</button>
                {searchMode === 'Publication' ? (
                  <>
                  <h3><FaBookOpen style={{ marginRight: '8px' }} />{modalContent.title}</h3>
                  <p><FaUsers style={{ marginRight: '8px' }} /><strong>Authors:</strong> {modalContent.authors.join(', ')}</p>
                  <p><FaCalendarAlt style={{ marginRight: '8px' }} /><strong>Year:</strong> {modalContent.year}</p>
                  <p><FaFileAlt style={{ marginRight: '8px' }} /><strong>Pages:</strong> {modalContent.pages}</p>
                  <p><FaUniversity style={{ marginRight: '8px' }} /><strong>Institution:</strong> {modalContent.institution}</p>
                  <p><FaBuilding style={{ marginRight: '8px' }} /><strong>Department:</strong> {modalContent.department}</p>

                  </>
                ) : (
                  <>
                    <h3><FaUser style={{ marginRight: '8px' }} />{modalContent.name}</h3>
                    <p><FaUniversity style={{ marginRight: '8px' }} /><strong>Institution:</strong> {modalContent.institution}</p>
                    <p><FaBuilding style={{ marginRight: '8px' }} /><strong>Department:</strong> {modalContent.department}</p>
                    <p><FaEnvelope style={{ marginRight: '8px' }} /><strong>Email:</strong> {modalContent.email}</p>
                    <p><FaMapMarkerAlt style={{ marginRight: '8px' }} /><strong>Address:</strong> {modalContent.address}</p>
                    <p><FaLink style={{ marginRight: '8px' }} /><strong>Homepage:</strong> <a href={modalContent.homepage} target="_blank" rel="noopener noreferrer">{modalContent.homepage}</a></p>

                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
