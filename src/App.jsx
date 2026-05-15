import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import BraceletGallery from './components/BraceletGallery';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider } from './context/LanguageContext';
import { siteConfig } from './data/config';

function AppContent() {
  useEffect(() => {
    document.title = `${siteConfig.brandName} - Pulseras Artesanales`;
  }, []);

  return (
    <div className="min-h-screen bg-pastel-cream">
      <LanguageSelector />
      <Hero />
      <About />
      <BraceletGallery />
      <Location />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;