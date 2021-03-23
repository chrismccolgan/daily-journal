import React from 'react';
import './App.css';
import { EntryProvider } from './components/Entry/EntryProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ApplicationViews from './ApplicationViews';
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
