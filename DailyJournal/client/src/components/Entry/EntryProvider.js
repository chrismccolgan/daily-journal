import React, { useState } from 'react';

const apiUrl = '/api/Entry';

export const EntryContext = React.createContext();

export const EntryProvider = (props) => {
  const [entries, setEntries] = useState([]);
  const [notification, setNotification] = useState(null);

  const getAllEntries = async () => {
    setNotification(null);
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.log(response);
        throw new Error('Could not fetch entries');
      }
      const data = await response.json();
      return data;
    };

    try {
      const entryData = await fetchData();
      setEntries(entryData);
    } catch (error) {
      setNotification({
        status: 'error',
        title: 'Error!',
        message: error.message,
      });
    }
  };

  // const getAllEntries = () => {
  //   return fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => setEntries(data));
  // };

  const getEntry = (id) => {
    return fetch(`${apiUrl}/${id}`).then((response) => response.json());
  };

  const addEntry = async (entry) => {
    setNotification(null);
    const sendData = async () => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
      if (!response.ok) {
        throw new Error('Adding journal entry failed');
      }
    };

    try {
      await sendData();
    } catch (error) {
      setNotification({
        status: 'error',
        title: 'Error!',
        message: error.message,
      });
    }
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
        notification,
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};
