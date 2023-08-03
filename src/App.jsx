import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherForm from './pages/WeatherForm';
import WeatherResult from './pages/WeatherResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherForm />} />
        <Route path="/weather" element={<WeatherResult />} />
      </Routes>
    </Router>
  );
}

export default App;
