import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <div className="image-gallery" onKeyDown={handleKeyDown} tabIndex="0" role="region" aria-label="Product image gallery">
      <div className="gallery-main">
        <div
          className={`gallery-image-container ${isZoomed ? 'zoomed' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={displayImages[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            className="gallery-image"
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />
          {displayImages.length > 1 && (
            <>
              <button
                className="gallery-nav gallery-prev"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="gallery-nav gallery-next"
                onClick={handleNext}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
          <div className="gallery-counter">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        </div>
      </div>

      {displayImages.length > 1 && (
        <div className="gallery-thumbnails">
          {displayImages.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      <div className="gallery-info">
        <p className="zoom-hint">Hover to zoom</p>
        <p className="keyboard-hint">Use arrow keys to navigate</p>
      </div>
    </div>
  );
};

export default ImageGallery;
