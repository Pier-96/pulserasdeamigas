import { siteConfig } from '../data/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 bg-gradient-to-b from-pastel-pink to-pastel-lavender">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo pequeño */}
        <div className="mb-4 flex justify-center">
          {siteConfig.logo?.startsWith('/') || siteConfig.logo?.startsWith('http') ? (
            <img 
              src={siteConfig.logo} 
              alt="Logo" 
              className="w-16 h-16 object-cover rounded-full shadow-md"
            />
          ) : (
            <div className="text-4xl">{siteConfig.logo}</div>
          )}
        </div>
        
        {/* Nombre */}
        <h3 className="font-display text-2xl font-bold text-primary-dark mb-2">
          {siteConfig.brandName}
        </h3>

        {/* Frase */}
        <p className="text-gray-600 font-body mb-4">
          {siteConfig.footerText}
        </p>

        {/* Copyright */}
        <div className="text-sm text-gray-500 font-body">
          © {currentYear} {siteConfig.brandName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;