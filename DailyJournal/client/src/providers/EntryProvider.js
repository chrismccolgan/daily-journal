import React, { useState } from 'react';

export const EntryContext = React.createContext();

export const EntryProvider = (props) => {
  const apiUrl = '/api/entry/';

  const [entries, setEntries] = useState([]);

  const getAllEntries = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then(setEntries);
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

  const searchEntries = (criterion) => {
    fetch(`${apiUrl}search?q=${criterion}`)
      .then(resp => resp.json())
      .then(setEntries);
  };

  return (
    <EntryContext.Provider value={{ entries, getAllEntries, addEntry, searchEntries }}>
      {props.children}
    </EntryContext.Provider>
  );
};
