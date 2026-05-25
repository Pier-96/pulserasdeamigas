import { useState, useEffect, useMemo } from 'react';
import { fetchBracelets, getDemoBracelets } from '../services/googleSheets';
import { useLanguage } from '../context/LanguageContext';

const BraceletGallery = () => {
  const { t } = useLanguage();
  const [bracelets, setBracelets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('todas');

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

  const categories = useMemo(() => {
    const cats = [...new Set(bracelets.map(b => b.categoria).filter(Boolean))];
    return cats.sort();
  }, [bracelets]);

  const chips = useMemo(() => [
    { value: 'todas', label: t('filterAll') },
    { value: 'disponibles', label: t('filterAvailable') },
    ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
  ], [categories, t]);

  const filteredBracelets = useMemo(() => {
    if (activeFilter === 'todas') return bracelets;
    if (activeFilter === 'disponibles') return bracelets.filter(b => b.estado?.toLowerCase() === 'disponible');
    return bracelets.filter(b => b.categoria === activeFilter);
  }, [bracelets, activeFilter]);

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
          <div className="flex gap-2 pb-3 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-9 w-24 rounded-[20px] loader-shimmer flex-shrink-0"></div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="w-full aspect-square loader-shimmer"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 w-3/4 rounded loader-shimmer mx-auto"></div>
                  <div className="h-3 w-1/4 rounded loader-shimmer mx-auto"></div>
                </div>
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

        <div className="md:flex md:gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-44 flex-shrink-0">
            <div className="md:sticky md:top-32">
              <h3 className="font-display text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {t('filterAll')}
              </h3>
              <nav className="space-y-1">
                {chips.map(chip => (
                  <button
                    key={chip.value}
                    onClick={() => setActiveFilter(chip.value)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === chip.value
                        ? 'bg-[#b541ad] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60 hover:text-gray-800'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Chips móvil */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-3 md:hidden">
              {chips.map(chip => (
                <button
                  key={chip.value}
                  onClick={() => setActiveFilter(chip.value)}
                  className={`flex-shrink-0 px-5 py-2 rounded-[20px] text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeFilter === chip.value
                      ? 'bg-[#b541ad] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Contador */}
            <p className="text-sm text-gray-500 font-body mb-4">
              {t('showing')} {filteredBracelets.length} {t('items')}
            </p>

            {filteredBracelets.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🌈</div>
                <p className="text-gray-500 text-lg font-body">{t('galleryEmpty')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredBracelets.map((bracelet, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="relative w-full aspect-square overflow-hidden bg-pastel-cream cursor-pointer"
                      onClick={() => setSelectedImage(bracelet.imagen_url)}
                    >
                      <img
                        src={bracelet.imagen_url}
                        alt={bracelet.nombre}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={handleImageError}
                      />
                      <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-tight ${
                        bracelet.estado?.toLowerCase() === 'disponible'
                          ? 'bg-green-100 text-green-700'
                          : bracelet.estado?.toLowerCase() === 'oferta'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {bracelet.estado?.toLowerCase() === 'disponible' ? t('available') : bracelet.estado?.toLowerCase() === 'oferta' ? t('onSale') : t('notAvailable')}
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-display text-sm font-semibold text-gray-700 mb-1 leading-tight">
                        {bracelet.nombre}
                      </h3>
                      <p className="text-primary-dark font-bold text-sm">
                        {bracelet.precio || t('price')} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
