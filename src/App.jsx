import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
