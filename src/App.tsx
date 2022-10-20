import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocatairesPage } from './pages/LocatairesPage';
import { VehiculesPage } from './pages/VehiculesPage';
import { Navbar } from './components/Navbar';
import { VehiculeLocation } from './components/locations/VehiculeLocation';
import { LocationsPage } from './pages/LocationsPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LocatairesPage />} />
        <Route path='/vehicules' element={<VehiculesPage />} />
        <Route path='/location' element={<LocationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
