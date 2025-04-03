// src/api/api.js

const API_BASE = "http://localhost:8080/api";

// Fetch publications with error handling
export const fetchPublications = async () => {
  try {
    const res = await fetch(`${API_BASE}/publications`);
    if (!res.ok) throw new Error(`Failed to fetch publications: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching publications:", error);
    return []; // Return empty array as fallback
  }
};

// Fetch authors with error handling
export const fetchAuthors = async () => {
  try {
    const res = await fetch(`${API_BASE}/authors`);
    if (!res.ok) throw new Error(`Failed to fetch authors: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching authors:", error);
    return []; // Return empty array as fallback
  }
};
