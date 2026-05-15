import { siteConfig } from '../data/config';

const About = () => {
  return (
    <section className="py-16 px-4 bg-pastel-cream">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-pastel-lavender/50">
          {/* Título con icono */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">🌸</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-dark">
              {siteConfig.aboutTitle}
            </h2>
            <span className="text-3xl">🌸</span>
          </div>

          {/* Iconos decorativos */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-secondary-light to-transparent rounded-full"></div>
          </div>

          {/* Texto */}
          <div className="text-center">
            <p className="text-gray-600 text-lg leading-relaxed font-body">
              {siteConfig.aboutText}
            </p>
          </div>

          {/* Iconos inferiores */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-pastel-pink rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl">🧵</span>
              </div>
              <span className="text-sm text-gray-500 font-body">Artesanal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-pastel-lavender rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl">💝</span>
              </div>
              <span className="text-sm text-gray-500 font-body">Hecho con amor</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-pastel-mint rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl">✨</span>
              </div>
              <span className="text-sm text-gray-500 font-body">Único</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;