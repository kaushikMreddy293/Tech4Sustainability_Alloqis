import React from "react";
import '../styles/landing.css';
import Navigation from "./navigation";
import carGreenImage from '../assets/rainforest.png';
import '../App.css';


const Landing = () => {
    return (
        <div className="container">
            <Navigation />
            <img src={carGreenImage} alt="Background" className="background-image" />
            <div className="text-container hubballi-regular">
                <h1 className="lexend-regular">Innovative Solutions for Greener {'\n'}  Manufacturing</h1>
                
                <p>Discover how additve manufacturing is revolutionizing {'\n'} production processes while minimizing environmental impact</p>
            </div>
            <button className="explore-btn lexend-regular ">Explore Our Solutions</button>
            <div className="flxRow text-insight">
                <div className="flxCol hubballi-regular">
                    <p className="insight-head lexend-regular">16+</p>
                    <p className="insight-des">Corprates</p>
                </div>
                <div className="flxCol hubballi-regular">
                    <p className="insight-head lexend-regular">1500+</p>
                    <p className="insight-des">Monthly Active Members</p>
                </div>
                <div className="flxCol hubballi-regular">
                    <p className="insight-head lexend-regular">24+</p>
                    <p className="insight-des">Manufacturing Projects</p>
                </div>
                <div className="flxCol hubballi-regular">
                    <p className="insight-head lexend-regular">12+</p>
                    <p className="insight-des">Sponsors</p>
                </div>

            </div>
        
        
        
        
        </div>
    )
}

export default Landing;