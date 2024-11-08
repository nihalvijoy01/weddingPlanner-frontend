// src/components/WeddingPlanningSection.jsx

import React from 'react';
import f1 from '/src/images/f1.png'
import f2 from '/src/images/f2.png'
import './filler1.css'

function Filler1() {
  return (
    <div className="container-fluid bg-white p-5">
      <div className="row g-4">
        {/* First Row */}
        <div className="col-md-6">
          <img
            src={f1} // Replace with actual URL
            alt="Wedding table decoration"
            className="img-fluid"
            style={{ height: '70%',width:'100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="h2f1">Save Time And Stress</h2> <br/><br/><br/>
          <p className="pf1 m-2 ">
            Planning a wedding can be a lot of work, and it's easy to get overwhelmed.
            We are here to help you save time and stress throughout the wedding planning process.
            Our team of experienced wedding planners can take care of all the details for you.
            We’ll work with you to create a wedding that is both beautiful and stress-free,
            so you can relax and enjoy the lead-up to your big day.
          </p>
        </div>
        

        {/* Second Row */}
        
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="h2f1">Tailored To Your Budget</h2> <br/><br/><br/>
          <p className="pf1">
            Our wedding planners are experts in finding affordable vendors and negotiating on your behalf.
            We can also help you to save money on wedding expenses, such as having a budget-friendly wedding menu
            or using artificial flowers instead of fresh flowers. We also offer a variety of wedding planning packages,
            so you can choose the one that fits your needs and budget best.
          </p>
        </div>
        

        <div className="col-md-6">
          <img
            src={f2} // Replace with actual URL
            alt="Wedding rings"
            className="img-fluid"
            style={{ height: '70%',width:'100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Filler1;
