import React from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import MainContent from './components/MainContent';
import FloatingSidebar from './components/FloatingSidebar';

function App() {
  return (
    <div className="app">
      <TopBar />
      <Header />
      <Navbar />
      <NewsTicker />
      <MainContent />
      <FloatingSidebar />
    </div>
  );
}

export default App;
