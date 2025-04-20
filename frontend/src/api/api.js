// src/api/api.js

const API_BASE = "http://localhost:8080/api";


/* PUBLICATION API FUNCTIONS */


// Fetch publications 
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


// Create a new publication
export const createPublication = async (newPub, authorIds) => {
  try {
    const res = await fetch(`${API_BASE}/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publication: newPub,
        authorIds: authorIds
      }),
    });

    if (!res.ok) throw new Error(`Failed to create publication: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error creating publication:", error);
  }
};


// Update an existing publication
export const updatePublication = async (id, updatedPub, authorIds) => {
  try {
    const res = await fetch(`${API_BASE}/publications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publication: updatedPub,
        authorIds: authorIds
      }),
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


/* AUTHOR API FUNCTION */


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

// Create a new author
export const createAuthor = async (newAuthor) => {
  try {
    const res = await fetch(`${API_BASE}/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAuthor),
    });
    if (!res.ok) throw new Error(`Failed to create author: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error creating author:", error);
  }
};


// Update an existing author
export const updateAuthor = async (id, updatedAuthor) => {
  try {
    const res = await fetch(`${API_BASE}/authors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAuthor),
    });
    if (!res.ok) throw new Error(`Failed to update author: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating author:", error);
  }
};


// Delete an author
export const deleteAuthor = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/authors/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete author: ${res.status}`);
  } catch (error) {
    console.error("Error deleting author:", error);
  }
};
