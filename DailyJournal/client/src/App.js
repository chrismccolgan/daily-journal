import React from 'react';
import './App.css';
import { EntryProvider } from './providers/EntryProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ApplicationViews from './ApplicationViews';
import { MoodProvider } from './providers/MoodProvider';

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
