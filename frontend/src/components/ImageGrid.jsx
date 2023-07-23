import './ImageGrid.css';
import React from 'react';

const ImageGrid = ({ imageUrls }) => {
  
    return (
      <div className="grid-container">
        {imageUrls.map((url, index) => (
          <div key={index} className="grid-item">
            <img src={url} alt={`Image ${index + 1}`} className="image" />
          </div>
        ))}
      </div>
    );
  };

export default ImageGrid;