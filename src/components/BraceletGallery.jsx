import { useState, useEffect, useRef } from 'react';
import { fetchBracelets, getDemoBracelets } from '../services/googleSheets';
import { useLanguage } from '../context/LanguageContext';

const BraceletGallery = () => {
  const { t } = useLanguage();
  const [bracelets, setBracelets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadBracelets();
  }, []);

  const loadBracelets = async () => {
    try {
      setLoading(true);
      const data = await fetchBracelets();
      
      if (data.length === 0) {
        setBracelets(getDemoBracelets());
      } else {
        setBracelets(data);
      }
      setError(false);
    } catch (err) {
      console.error('Error loading bracelets:', err);
      setBracelets(getDemoBracelets());
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23FDE4EC" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="40"%3E💖%3C/text%3E%3C/svg%3E';
  };

  if (loading) {
    return (
      <section id="galeria" className="py-16 px-4 bg-pastel-pink/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-2">
              {t('galleryTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-light via-primary to-primary-light mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-3 shadow-lg">
                <div className="w-full h-36 rounded-xl loader-shimmer mb-3"></div>
                <div className="h-5 w-3/4 rounded loader-shimmer mb-2"></div>
                <div className="h-4 w-1/4 rounded loader-shimmer"></div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg">
                <div className="w-full h-48 rounded-xl loader-shimmer mb-4"></div>
                <div className="h-6 w-3/4 rounded loader-shimmer mb-2"></div>
                <div className="h-4 w-1/4 rounded loader-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-16 px-4 bg-pastel-pink/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-2">
            {t('galleryTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-light via-primary to-primary-light mx-auto rounded-full"></div>
        </div>

        <div className="hidden md:flex justify-between items-center mb-6">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-primary hover:bg-pastel-pink"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-primary hover:bg-pastel-pink"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {bracelets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌈</div>
            <p className="text-gray-500 text-lg font-body">{t('galleryEmpty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {bracelets.map((bracelet, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-pastel-cream cursor-pointer"
                  onClick={() => setSelectedImage(bracelet.imagen_url)}
                >
                  <img
                    src={bracelet.imagen_url}
                    alt={bracelet.nombre}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    bracelet.estado?.toLowerCase() === 'disponible'
                      ? 'bg-green-100 text-green-700'
                      : bracelet.estado?.toLowerCase() === 'oferta'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {bracelet.estado?.toLowerCase() === 'disponible' ? t('available') : bracelet.estado?.toLowerCase() === 'oferta' ? t('onSale') : t('notAvailable')}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-sm font-semibold text-gray-700 mb-1">
                    {bracelet.nombre}
                  </h3>
                  <p className="text-primary-dark font-bold text-base">
                    {bracelet.precio || t('price')}
                  </p>
                </div>
              </div>
            ))}
          </div>)}

          {/* Vista escritorio: scroll horizontal */}
          <div
            ref={scrollRef}
            className="hidden md:flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {bracelets.map((bracelet, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-pastel-cream cursor-pointer"
                  onClick={() => setSelectedImage(bracelet.imagen_url)}
                >
                  <img
                    src={bracelet.imagen_url}
                    alt={bracelet.nombre}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    bracelet.estado?.toLowerCase() === 'disponible'
                      ? 'bg-green-100 text-green-700'
                      : bracelet.estado?.toLowerCase() === 'oferta'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {bracelet.estado?.toLowerCase() === 'disponible' ? t('available') : bracelet.estado?.toLowerCase() === 'oferta' ? t('onSale') : t('notAvailable')}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-gray-700 mb-2">
                    {bracelet.nombre}
                  </h3>
                  <p className="text-primary-dark font-bold text-xl">
                    {bracelet.precio || t('price')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-sm w-full md:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold leading-none"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Vista ampliada"
              className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BraceletGallery;