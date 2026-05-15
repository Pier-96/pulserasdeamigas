import { siteConfig } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

const Location = () => {
  const { t } = useLanguage();

  return (
    <section id="ubicacion" className="py-16 px-4 bg-pastel-lavender/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-dark mb-2">
            {t('locationTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary-light via-secondary to-secondary-light mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border-2 border-secondary-light/30">
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <iframe
              src={siteConfig.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Ubicación"
            ></iframe>
          </div>

          <div className="text-center">
            <p className="text-gray-600 font-body">
              {t('locationText')}
            </p>
            {siteConfig.address && (
              <p className="text-secondary font-semibold mt-2 font-body">
                📍 {siteConfig.address}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;