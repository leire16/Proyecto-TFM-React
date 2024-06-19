import React, { useState, useEffect } from 'react';

const ImageLoader = ({ src, alt, className }) => {
    const [loading, setLoading] = useState(true);
    const [currentImg, setCurrentImg] = useState('');

    useEffect(() => {
        if (src) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                setCurrentImg(src);
                setLoading(false);
            };
        } else {
            setCurrentImg('');
            setLoading(false);
        }
    }, [src]);

    return (
        <>
            {loading ? (
                <p>Cargando imagen...</p>
            ) : (
                currentImg && <img className={className} src={currentImg} alt={alt} />
            )}
        </>
    );
};

export default ImageLoader;
