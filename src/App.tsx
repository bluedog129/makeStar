import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppWrapper } from './styles/App.styles';
import AlbumManagement from './pages/AlbumManagement';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/management" element={<AlbumManagement />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;