// src/pages/Dashboard.jsx

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '/src/images/7_og.png'
import img2 from '/src/images/15.jpg'
import img3 from '/src/images/16.jpg'
import './landing.css'
import NavbarOG from '../Navbar/Navbar';
import Filler1 from './filler1';

function Landing() {
  return (
    <div className='dash-container'>
    {/* <NavbarOG /> */}
    <div className="containerarch">
    <div className="image-section">
        
    <Carousel
      style={{
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Prevent overflow on smaller screens
        
      }}
    >
      <Carousel.Item interval={3000}>
        <img
          src={img1} // Replace with your actual image URL
          alt="First slide"
          className="d-block w-100"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover', // Ensures image covers the full area
          }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          src={img2} // Replace with your actual image URL
          alt="Second slide"
          className="d-block w-100"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img3} // Replace with your actual image URL
          alt="Third slide"
          className="d-block w-100"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div className="text-overlay">
                <h1>TURNING YOUR WEDDING DREAMS <br/>INTO ULTIMATE REALITY</h1> <br />
                <p>Crafting every detail to shape your perfect wedding day.</p> <br /> <br />
                <button>GET STARTED</button>
            </div>
        <div className="arch-overlay"></div>
        
    </div>
</div>
          <Filler1 />
</div>
  );
}

export default Landing;
