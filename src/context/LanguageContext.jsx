import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    heroTagline: 'Pulseras artesanales feitas con mucho amor ✨',
    primaryButton: 'Ver Pulseras',
    secondaryButton: 'Contactar',
    aboutTitle: '¿Quiénes somos?',
    aboutText: '¡Hola! Somos tres amigas de 9 años. Nos encanta hacer pulseras bonitas y únicas con nuestras manos. Cada pulsera está hecha con mucho cariño y amor. ¡Nos encantaría que conocieras nuestras creaciones!',
    locationTitle: 'Ven a visitarnos',
    locationText: 'Puedes encontrar nuestras pulseras en el parque al lado de la escuela del bosque.',
    contactTitle: '¡Contáctanos!',
    contactText: '¿Te gustaría una pulsera personalizada? ¡Escríbenos! 💖',
    footerText: 'Hecho con amor ♥',
    whatsappMessage: '¡Hola! Me gustaría conocer las pulseras disponibles 💖',
    galleryTitle: 'Nuestras Pulseras',
    galleryEmpty: '¡Pronto añadiremos nuevas pulseras!',
    contactWhatsApp: 'Escribir en WhatsApp',
    artisanal: 'Artesanal',
    madeWithLove: 'Hecho con amor',
    unique: 'Único',
    available: 'Disponible',
    notAvailable: 'No disponible',
    price: 'Consultar',
  },
  ca: {
  heroTagline: 'Polseres artesanals fetes amb molt d\'amor ✨',
  primaryButton: 'Veure polseres',
  secondaryButton: 'Contactar',
  aboutTitle: 'Qui som?',
  aboutText: 'Hola! Som tres amigues de 9 anys. Ens encanta fer polseres boniques i úniques amb les nostres mans. Cada polsera està feta amb molt d\'afecte i amor. Ens encantaria que coneguessis les nostres creacions!',
  locationTitle: 'Vine a visitar-nos',
  locationText: 'Pots trobar les nostres polseres al parc del costat de l\'escola.',
  contactTitle: 'Contacta\'ns!',
  contactText: 'T\'agradaria una polsera personalitzada? Escriu-nos! 💖',
  footerText: 'Fet amb amor ♥',
  whatsappMessage: 'Hola! M\'agradaria conèixer les polseres disponibles 💖',
  galleryTitle: 'Les nostres polseres',
  galleryEmpty: 'Aviat afegirem noves polseres!',
  contactWhatsApp: 'Escriu-nos per WhatsApp',
  artisanal: 'Artesanal',
  madeWithLove: 'Fet amb amor',
  unique: 'Únic',
  available: 'Disponible',
  notAvailable: 'No disponible',
  price: 'Consultar',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);