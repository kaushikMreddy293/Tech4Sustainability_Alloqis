// NavBar.js
import React from 'react';
import '../styles/navigation.css'; // Assuming you have or will create a separate CSS file for the NavBar
import { Link } from 'react-router-dom';
import '../App.css'
import carGreenImage from '../assets/car_green.jpg';
const Navigation = () => {
    return (
        <nav className="navbar hubballi-regular">
            <ul>
            <img src={carGreenImage} alt="Background" className="logo-1" />
               
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/orders" >Orders</Link></li>
                {/* <li> <Link to="/calculator" >Calculator</Link> </li> */}
                <li><Link to="/compare" >Compare</Link></li>
                {/* <li><Link to="/" >About</Link></li> */}
                <li><Link to="/" className='contact-btn' >Contact Us</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
