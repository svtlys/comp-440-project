import './HomePage.css';
import {
  FaSearch, FaBookOpen, FaUsers, FaCalendarAlt, FaFileAlt,
  FaUniversity, FaBuilding, FaUser, FaEnvelope,
  FaMapMarkerAlt, FaLink
} from 'react-icons/fa';
import ReactSlider from 'react-slider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPublications, fetchAuthors } from './api/api';



function HomePage() {
  // track whether we're on the 'Author' or 'Publication' tab
  const [searchMode, setSearchMode] = useState('Author');

  // search keyword input
  const [keyword, setKeyword] = useState('');

  // year range filter (for publication mode only)
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);

  // sorting fields (shared by both tabs)
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // data from backend
  const [realPublications, setRealPublications] = useState([]);
  const [realAuthors, setRealAuthors] = useState([]);

  // author filters
  const [institutionFilters, setInstitutionFilters] = useState([]);
  const [departmentFilters, setDepartmentFilters] = useState([]);

  // publication filters
  const [publicationInstitutionFilters, setPublicationInstitutionFilters] = useState([]);
  const [publicationDepartmentFilters, setPublicationDepartmentFilters] = useState([]);

  const navigate = useNavigate();

  // when search button is clicked
  const handleSearch = () => {
    if (searchMode === 'Publication') {
      fetchPublications().then(setRealPublications);
    } else {
      fetchAuthors().then(setRealAuthors);
    }
  };

  // helper functions to toggle filters on/off
  const toggleInstitution = (value) => {
    setInstitutionFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleDepartment = (value) => {
    setDepartmentFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const togglePublicationInstitution = (value) => {
    setPublicationInstitutionFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const togglePublicationDepartment = (value) => {
    setPublicationDepartmentFilters(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };


  // FILTER logic for authors
  const filteredAuthors = realAuthors.filter(author => {
    const text = `${author.name} ${author.institution}`.toLowerCase();
    const matchesKeyword = keyword.trim() !== '' && text.includes(keyword.toLowerCase());
    const matchesInstitution = institutionFilters.length === 0 || institutionFilters.includes(author.institution);
    const matchesDepartment = departmentFilters.length === 0 || departmentFilters.includes(author.department);
    return matchesKeyword && matchesInstitution && matchesDepartment;
  });

  // FILTER! logic for publications
  const filteredPublications = realPublications.filter(pub => {
    const text = `${pub.title} ${pub.authorEntities?.map(a => a.name).join(' ')}`.toLowerCase();    
    const matchesKeyword = keyword.trim() !== '' && text.includes(keyword.toLowerCase());
    const matchesYearRange = pub.year >= minYear && pub.year <= maxYear;
    const matchesInstitution = publicationInstitutionFilters.length === 0 || publicationInstitutionFilters.includes(pub.institution);
    const matchesDepartment = publicationDepartmentFilters.length === 0 || publicationDepartmentFilters.includes(pub.department);
    return matchesKeyword && matchesYearRange && matchesInstitution && matchesDepartment;
  });


  // grab all unique institutions/departments (from full data)
  const allPublicationInstitutions = [...new Set(realPublications.map(p => p.institution).filter(Boolean))];
  const allPublicationDepartments = [...new Set(realPublications.map(p => p.department).filter(Boolean))];
  const allInstitutions = [...new Set(realAuthors.map(a => a.institution).filter(Boolean))];
  const allDepartments = [...new Set(realAuthors.map(a => a.department).filter(Boolean))];


  // SORT the results
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });


  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });


  // when user clicks a sort button
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  //for modal (popup) when clicking results
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
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="content-container">
          <div className="navbar-title">Publication Listing Service</div>
          <div className="navbar-links">
            <button onClick={() => navigate('/publications')}><FaBookOpen /> Publications</button>
            <button onClick={() => navigate('/authors')}><FaUser /> Authors</button>
            <button onClick={() => navigate('/')}><FaSearch /> Search</button>
          </div>
        </div>
      </nav>

      {/* SEARCH + FILTER + RESULTS */}
      <div className="content-container">
        <div className="search-section">
          <h2>Search {searchMode}</h2>


          {/* keyword search input */}
          <div className="search-box">
            <input
              type="text"
              placeholder={`Search by ${searchMode === 'Publication' ? 'title or author' : 'name or institution'}`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}><FaSearch /> Search</button>
          </div>


          {/* tab toggle between author/publication */}
          <div className="search-tabs-bar">
            <div className="search-tabs">
              <span className={searchMode === 'Publication' ? 'active' : ''} onClick={() => { setSearchMode('Publication'); setSortField('title'); }}>Publication</span>
              <span className={searchMode === 'Author' ? 'active' : ''} onClick={() => { setSearchMode('Author'); setSortField('name'); }}>Author</span>
            </div>
          </div>


          {/* layout with filters + results */}
          <div className="layout-container">
            {/* SIDEBAR FILTERS */}
            <div className="filter-sidebar">
              <div className="filter-section">
                <h4>Keyword</h4>
                <div className="keyword-box">{keyword || '—'}</div>
              </div>


              {/* Filters change depending on mode */}
              {searchMode === 'Author' && (
                <>
                  <div className="filter-section">
                    <h4>Institutions</h4>
                    {allInstitutions.map((inst, i) => (
                      <label key={i}>
                        <input
                          type="checkbox"
                          value={inst}
                          checked={institutionFilters.includes(inst)}
                          onChange={() => toggleInstitution(inst)}
                        />
                        {inst}
                      </label>
                    ))}
                  </div>

                  <div className="filter-section">
                    <h4>Departments</h4>
                    {allDepartments.map((dept, i) => (
                      <label key={i}>
                        <input
                          type="checkbox"
                          value={dept}
                          checked={departmentFilters.includes(dept)}
                          onChange={() => toggleDepartment(dept)}
                        />
                        {dept}
                      </label>
                    ))}
                  </div>
                </>
              )}

              {searchMode === 'Publication' && (
                <>
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
                    <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>{minYear} - {maxYear}</div>
                  </div>

                  <div className="filter-section">
                    <h4>Institutions</h4>
                    {allPublicationInstitutions.map((inst, i) => (
                      <label key={i}>
                        <input
                          type="checkbox"
                          value={inst}
                          checked={publicationInstitutionFilters.includes(inst)}
                          onChange={() => togglePublicationInstitution(inst)}
                        />
                        {inst}
                      </label>
                    ))}
                  </div>

                  <div className="filter-section">
                    <h4>Departments</h4>
                    {allPublicationDepartments.map((dept, i) => (
                      <label key={i}>
                        <input
                          type="checkbox"
                          value={dept}
                          checked={publicationDepartmentFilters.includes(dept)}
                          onChange={() => togglePublicationDepartment(dept)}
                        />
                        {dept}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* SEARCH RESULTS */}
            <div className="results-container">
              {/* sorting buttons */}
              <div className="sort-buttons">
                {searchMode === 'Publication' ? (
                  <>
                    <button onClick={() => toggleSort('title')}>Sort by Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                    <button onClick={() => toggleSort('year')}>Sort by Year {sortField === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleSort('name')}>Sort by Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                    <button onClick={() => toggleSort('institution')}>Sort by Institution {sortField === 'institution' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </>
                )}
              </div>


              {/* actual results being shown */}
              <div className="search-results">
                {searchMode === 'Publication' ? (
                  sortedPublications.length === 0 ? (
                    <p className="no-result-message">No publication found</p>
                  ) : (
                    sortedPublications.map((pub, index) => (
                      <div key={index} className="result-card">
                        <h3 className="result-title" onClick={() => openModal(pub)}>{pub.title}</h3>
                        <p><strong>Authors:</strong> {pub.authorEntities?.map(a => a.name).join(', ')}</p>
                        <p><strong>Year:</strong> {pub.year}</p>
                      </div>
                    ))
                  )
                ) : (
                  sortedAuthors.length === 0 ? (
                    <p className="no-result-message">No author found</p>
                  ) : (
                    sortedAuthors.map((author, index) => (
                      <div key={index} className="result-card">
                        <h3 className="result-title" onClick={() => openModal(author)}>{author.name}</h3>
                        <p><strong>Institution:</strong> {author.institution}</p>
                        <p><strong>Homepage:</strong> <a href={author.homepage} target="_blank" rel="noopener noreferrer">{author.homepage}</a></p>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>



        {/* MODAL OVERLAY for result details */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              {searchMode === 'Publication' ? (
                <>
                  <h3><FaBookOpen style={{ marginRight: '8px' }} />{modalContent.title}</h3>
                  <p><FaUsers style={{ marginRight: '8px' }} /><strong>Authors:</strong> {modalContent.authorEntities?.map(a => a.name).join(', ')}</p>
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
  );
}

export default HomePage;
