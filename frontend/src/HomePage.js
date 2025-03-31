// HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import { FaSearch, FaBookOpen, FaUser } from 'react-icons/fa';

function HomePage() {
  const [searchMode, setSearchMode] = useState('Publisher');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const mockResults = [
    { title: "Efficient Algorithms for Big Data", authors: ["Alice Johnson", "Bob Smith"], pages: "101-120", year: 2023 },
    { title: "Deep Learning in Natural Language Processing", authors: ["Catherine Lee"], pages: "55-72", year: 2022 },
    { title: "Blockchain Security Models", authors: ["Daniel Zhang", "Eva Lin"], pages: "10-32", year: 2021 },
    { title: "Quantum Computing Applications", authors: ["Nina Patel"], pages: "45-67", year: 2020 },
    { title: "Scalable Web Architecture", authors: ["Arjun Mehta", "Laura Kim"], pages: "88-105", year: 2023 },
    { title: "Data Visualization Techniques", authors: ["Monica Reyes"], pages: "22-44", year: 2019 },
    { title: "Edge AI and IoT Integration", authors: ["Leo Chen"], pages: "130-150", year: 2022 },
    { title: "Cybersecurity Trends in 2024", authors: ["Zara Ali", "Hassan Raza"], pages: "61-79", year: 2024 },
    { title: "Augmented Reality in Education", authors: ["Emily Stone"], pages: "200-218", year: 2020 },
    { title: "Green Computing and Sustainability", authors: ["Kai Tan", "Sofia Martinez"], pages: "15-35", year: 2021 }
  ];

  const sortedResults = [...mockResults].sort((a, b) => {
    const valA = a[sortField].toString().toLowerCase();
    const valB = b[sortField].toString().toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
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
          <h2>Search Publication</h2>
          <div className="search-box">
            <input type="text" placeholder="Search by publication or author" />
            <button><FaSearch /> Search</button>
          </div>

          <div className="search-tabs-bar">
            <div className="search-tabs">
              <span
                className={searchMode === 'Publisher' ? 'active' : ''}
                onClick={() => setSearchMode('Publisher')}
              >
                Publisher
              </span>
              <span
                className={searchMode === 'Author' ? 'active' : ''}
                onClick={() => setSearchMode('Author')}
              >
                Author
              </span>
            </div>
          </div>

          {/* Sorting + Filter UI */}
          <div className="sort-filter-bar">
            <div className="filter-sidebar">
              <p style={{ fontWeight: 'bold' }}>Filters (working on it)</p>
              {/* Add filter UI here later */}
            </div>
            <div className="sort-buttons">
              <button onClick={() => toggleSort('title')}>
                Sort by Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button onClick={() => toggleSort('year')}>
                Sort by Year {sortField === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          <div className="search-results">
            {sortedResults.map((pub, index) => (
              <div key={index} className="result-card">
                <h3>{pub.title}</h3>
                <p><strong>Authors:</strong> {pub.authors.join(', ')}</p>
                <p><strong>Pages:</strong> {pub.pages}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
