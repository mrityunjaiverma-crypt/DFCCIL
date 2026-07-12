import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import FloatingSidebar from './components/FloatingSidebar';
import Login from './pages/Login';
import Admin from './pages/Admin';
import PressReleases from './pages/PressReleases';
import AboutPage from './pages/AboutPage';
import RegistrationPage from './pages/RegistrationPage';
import RegisteredMembersPage from './pages/RegisteredMembersPage';

function App() {
  return (
    <div className="app">
      <TopBar />
      <Header />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/press-releases" element={<PressReleases />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registered-members" element={<RegisteredMembersPage />} />
        <Route path="/page/:sectionId" element={<AboutPage />} />
      </Routes>

      <FloatingSidebar />
    </div>
  );
}

export default App;
