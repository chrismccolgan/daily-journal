const apiUrl = '/api/Entry';

export const getAllEntries = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not fetch entries');
  }

  return data;
};

export const getEntry = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not fetch entry');
  }

  return data;
};

export const addEntry = async (entry) => {
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

  return null;
};

export const updateEntry = async (entry) => {
  const response = await fetch(`${apiUrl}/${entry.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error('Updating journal entry failed');
  }

  return null;
};
