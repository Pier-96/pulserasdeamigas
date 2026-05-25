/**
 * Servicio para obtener datos de pulseras desde Google Sheets
 * 
 * CONFIGURACIÓN:
 * 1. Publica tu Google Sheet como CSV o usa la API de Google Sheets
 * 2. Reemplaza SHEET_URL con tu URL pública del sheet
 * 
 * Estructura esperada del sheet:
 * - nombre: string (nombre de la pulsera)
 * - imagen_url: string (URL de la imagen)
 * - precio: string (precio con formato, ej: "3€")
 * - estado: string ("Disponible" o "Agotado")
 */

// CONFIGURACIÓN - Cambia esta URL por tu Google Sheet público
// Ejemplo de URL pública: 'https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?output=csv'

import { siteConfig } from '../data/config';
export const SHEET_URL = siteConfig.sheetsUrl;

/**
 * Obtiene los datos de pulseras desde Google Sheets
 * @returns {Promise<Array>} Array de objetos con datos de pulseras
 */
export const fetchBracelets = async () => {
  try {
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }
    
    const csvText = await response.text();
    const bracelets = parseCSV(csvText);
    
    return bracelets;
  } catch (error) {
    console.error('Error fetching bracelets:', error);
    return [];
  }
};

/**
 * Convierte CSV a array de objetos
 * @param {string} csvText - Contenido CSV
 * @returns {Array} Array de objetos
 */
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    return [];
  }
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const bracelets = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length === headers.length) {
      const bracelet = {};
      headers.forEach((header, index) => {
        bracelet[header] = values[index];
      });
      
      if (bracelet.nombre) {
        bracelets.push(bracelet);
      }
    }
  }
  
  return bracelets;
};

/**
 * Parsea una línea CSV manejando comillas
 * @param {string} line - Línea CSV
 * @returns {Array} Array de valores
 */
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

/**
 * Datos de ejemplo para desarrollo/testing
 * Elimina esto cuando tengas tu Google Sheets configurado
 */
export const getDemoBracelets = () => [
  {
    nombre: 'Pulsera Arcoíris',
    imagen_url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop',
    precio: '5€',
    estado: 'Disponible',
    categoria: 'hilo'
  },
  {
    nombre: 'Pulsera Corazon Rosa',
    imagen_url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
    precio: '4€',
    estado: 'Disponible',
    categoria: 'macrame'
  },
  {
    nombre: 'Pulsera Estrellas',
    imagen_url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    precio: '6€',
    estado: 'Disponible',
    categoria: 'hilo'
  },
  {
    nombre: 'Pulsera Mariposa',
    imagen_url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop',
    precio: '5€',
    estado: 'Vendida',
    categoria: 'perlas'
  },
  {
    nombre: 'Pulsera Unicornio',
    imagen_url: 'https://images.unsplash.com/photo-1606103836293-0a063b604ae0?w=400&h=400&fit=crop',
    precio: '7€',
    estado: 'Disponible',
    categoria: 'perlas'
  },
  {
    nombre: 'Pulsera Flor Sakura',
    imagen_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    precio: '4€',
    estado: 'Disponible',
    categoria: 'macrame'
  }
];