import React, { useState } from 'react';

export const EntryContext = React.createContext();

export const EntryProvider = (props) => {
  const apiUrl = '/api/Entry';

  const [entries, setEntries] = useState([]);

  const getAllEntries = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then(setEntries);
  };

  const getEntry = (id) => {
    return fetch(`${apiUrl}/${id}`).then((resp) => resp.json());
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
    }).then(getAllEntries);
  };

  const deleteEntry = (id) => {
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    }).then(getAllEntries);
  };

  const searchEntries = (criterion) => {
    fetch(`${apiUrl}/search?q=${criterion}`)
      .then((resp) => resp.json())
      .then(setEntries);
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
