// HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import { FaSearch, FaBookOpen, FaUser } from 'react-icons/fa';

function HomePage() {
  const [searchMode, setSearchMode] = useState('Publisher');

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
        </div>
      </div>
    </div>
  );
}

export default HomePage;