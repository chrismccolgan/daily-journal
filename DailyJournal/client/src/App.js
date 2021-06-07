import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/UI/Header';
import ApplicationViews from './ApplicationViews';
import { EntryProvider } from './components/Entry/EntryProvider';
import { MoodProvider } from './components/Mood/MoodProvider';

function App() {
  return (
    <Router>
      <EntryProvider>
        <MoodProvider>
          <Header />
          <ApplicationViews />
        </MoodProvider>
      </EntryProvider>
    </Router>
  );
}

export default App;
