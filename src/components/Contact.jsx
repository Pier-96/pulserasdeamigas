import { siteConfig } from '../data/config';

const Contact = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(siteConfig.whatsappMessage);
    const phone = siteConfig.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${siteConfig.phone}`, '_blank');
  };

  return (
    <section id="contacto" className="py-16 px-4 bg-pastel-coral/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-2">
            {siteConfig.contactTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-light via-primary to-primary-light mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-primary-light/30 text-center">
          {/* Icono decorativo */}
          <div className="text-5xl mb-6">💖</div>

          {/* Mensaje */}
          <p className="text-gray-600 text-lg mb-8 font-body">
            {siteConfig.contactText}
          </p>

          {/* Botones de contacto */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Botón WhatsApp */}
            <button 
              onClick={handleWhatsApp}
              className="flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-body"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir en WhatsApp
            </button>

            {/* Botón Llamar */}
            <button 
              onClick={handleCall}
              className="flex items-center gap-3 px-8 py-4 bg-primary-light hover:bg-primary text-primary-dark font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-body"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {siteConfig.phone}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;