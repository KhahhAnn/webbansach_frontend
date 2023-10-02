import React from 'react';import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/Homepage/Homepage';

function App() {
  return (
    <div>
        <Navbar />
        <Homepage />
        <Footer />
    </div>
  );
}

export default App;
