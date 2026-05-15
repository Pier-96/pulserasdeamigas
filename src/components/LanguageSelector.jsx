import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={() => setLanguage('es')}
        className={`w-10 h-8 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-110 ${
          language === 'es' ? 'ring-2 ring-primary' : 'opacity-70'
        }`}
        title="Español"
      >
        <img 
          src="/spain.jpg"
          alt="España"
          className="w-full h-full object-cover"
        />
      </button>
      
      <button
        onClick={() => setLanguage('ca')}
        className={`w-10 h-8 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-110 ${
          language === 'ca' ? 'ring-2 ring-primary' : 'opacity-70'
        }`}
        title="Català"
      >
        <img 
          src="/catalunya.jpg"
          alt="Catalunya"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSelector;