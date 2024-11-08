// src/components/ExampleCarouselImage.jsx

import React from 'react';
import PropTypes from 'prop-types';
import img1 from '../images/7_enhanced1.png'
function ExampleCarouselImage({ text }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <img
        src={img1} // High-resolution placeholder for full width
        alt={text}
        className="d-block w-100"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {text && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

ExampleCarouselImage.propTypes = {
  text: PropTypes.string,
};

export default ExampleCarouselImage;
