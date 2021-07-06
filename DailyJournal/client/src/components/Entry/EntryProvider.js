import React, { useState, useReducer } from 'react';

const apiUrl = '/api/Entry';

export const EntryContext = React.createContext();

const entryProviderReducer = (state, action) => {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
};

export const EntryProvider = (props) => {
  const [entries, setEntries] = useState([]);
  const [notification, setNotification] = useState(null);
  const [entryState, dispatch] = useReducer(entryProviderReducer, {
    status: null,
    data: null,
    error: null,
  });

  const getAllEntries = async () => {
    dispatch({ type: 'SEND' });

    const fetchData = async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.log(response);
        throw new Error(response.message || 'Could not fetch entries');
      }
      const data = await response.json();
      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch({ type: 'SUCCESS', responseData });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        errorMessage: error.message || 'Something went wrong!',
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
        entryState,
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};
