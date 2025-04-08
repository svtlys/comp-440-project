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

// Create a new publication
export const createPublication = async (newPub) => {
  try {
    const res = await fetch(`${API_BASE}/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPub),
    });
    if (!res.ok) throw new Error(`Failed to create publication: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error creating publication:", error);
  }
};

// Update an existing publication
export const updatePublication = async (id, updatedPub) => {
  try {
    const res = await fetch(`${API_BASE}/publications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPub),
    });
    if (!res.ok) throw new Error(`Failed to update publication: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating publication:", error);
  }
};

// Delete a publication
export const deletePublication = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/publications/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete publication: ${res.status}`);
  } catch (error) {
    console.error("Error deleting publication:", error);
  }
};
