import React, { useState, useEffect } from 'react';

const Preloader = ({ images, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = (error) => reject(error);
      });
    };

    const preloadImages = async () => {
      try {
        await Promise.all(images.map((image) => loadImage(image)));
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        // Maneja el error de carga de imágenes aquí
      }
    };
    

    preloadImages();
  }, [images]);

  return loading ? <div>Cargando imágenes...</div> : children;
};

export default Preloader;
