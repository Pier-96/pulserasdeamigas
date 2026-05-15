import { siteConfig } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToGallery = () => {
    document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-gradient-to-b from-pastel-cream via-pastel-pink to-pastel-lavender">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-light/30 rounded-full animate-float"></div>
        <div className="absolute top-20 right-16 w-16 h-16 bg-secondary-light/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pastel-mint/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-primary-light/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative mb-8 animate-fade-in">
        <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white/60 backdrop-blur-sm shadow-lg flex items-center justify-center border-4 border-primary-light/30 overflow-hidden">
          {siteConfig.logo?.startsWith('/') || siteConfig.logo?.startsWith('http') ? (
            <img 
              src={siteConfig.logo} 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl md:text-7xl">{siteConfig.logo}</span>
          )}
        </div>
        <div className="absolute -top-2 -right-2 text-3xl animate-pulse-soft">✨</div>
        <div className="absolute -bottom-1 -left-1 text-2xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}>⭐</div>
      </div>

      <div className="text-center relative z-10 animate-slide-up">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 tracking-tight">
          {siteConfig.brandName}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto font-body">
          {t('heroTagline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToGallery}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-body"
          >
            {t('primaryButton')}
          </button>
          
          <button 
            onClick={scrollToContact}
            className="px-8 py-3 bg-white hover:bg-pastel-pink text-primary-dark font-semibold rounded-full shadow-md hover:shadow-lg border-2 border-primary-light hover:border-primary transition-all duration-300 transform hover:scale-105 font-body"
          >
            {t('secondaryButton')}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;