import React, { useState } from 'react';

const apiUrl = '/api/Entry';

export const EntryContext = React.createContext();

export const EntryProvider = (props) => {
  const [entries, setEntries] = useState([]);

  const getAllEntries = () => {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEntries(data));
  };

  const getEntry = (id) => {
    return fetch(`${apiUrl}/${id}`).then((response) => response.json());
  };

  const addEntry = (entry) => {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
  };

  const updateEntry = (entry) => {
    return fetch(`${apiUrl}/${entry.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
  };

  const deleteEntry = (id) => {
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    }).then(() => getAllEntries());
  };

  const searchEntries = (criterion) => {
    return fetch(`${apiUrl}/search?q=${criterion}`)
      .then((response) => response.json())
      .then((data) => setEntries(data));
  };

  return (
    <EntryContext.Provider
      value={{
        entries,
        getAllEntries,
        getEntry,
        addEntry,
        updateEntry,
        deleteEntry,
        searchEntries,
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};
