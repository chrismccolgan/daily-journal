import React, { useState } from 'react';

export const MoodContext = React.createContext();

export const MoodProvider = (props) => {
  const [moods, setMoods] = useState([]);

  const getAllMoods = () => {
    return fetch('/api/Mood')
      .then((res) => res.json())
      .then(setMoods);
  };

  return (
    <MoodContext.Provider value={{ moods, getAllMoods }}>
      {props.children}
    </MoodContext.Provider>
  );
};
