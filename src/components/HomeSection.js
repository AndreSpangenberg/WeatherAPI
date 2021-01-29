import React from 'react';
import '../App.css';
import './HomeSection.css';
import { Button } from './Button';


function HomeSection() {
    return (
        <div className = 'home-container'>
          <h1>GET YOUR WEATHER FORECAST</h1>
          <div className="home-btn">
              <Button className="btn" buttonStyle='btn--outline' 
              buttonSize='btn--large' >Get Forecast</Button>
          </div>
        </div>
    );
}

export default HomeSection;