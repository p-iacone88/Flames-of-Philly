import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Asian from './pages/Asian.jsx';
import Halal from './pages/Halal.jsx';
import Latin from './pages/Latin.jsx';
import About from './pages/About.jsx';
import Header from './pages/Header.jsx';
import Navigation from './pages/Navigation.jsx';
import Footer from './pages/Footer.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asian" element={<Asian />} />
          <Route path="/halal" element={<Halal />} />
          <Route path="/latin" element={<Latin />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
