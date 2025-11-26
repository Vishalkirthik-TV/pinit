import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import FloatingPins from './components/FloatingPins';

function App() {
  return (
    <div className="App">
      <FloatingPins />
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
