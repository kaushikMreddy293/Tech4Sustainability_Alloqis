// NavBar.js
import React from 'react';
import '../styles/navigation.css'; // Assuming you have or will create a separate CSS file for the NavBar
import { Link } from 'react-router-dom';
import '../App.css'
const Navigation = () => {
  return (
    <nav className="navbar hubballi-regular">
      <ul>
      <li><Link to="/" >Home</Link></li>
      <li><a href=" " className="dropbtn">Calculator</a></li>
      <li><a href=" " className="dropbtn">Compare</a> </li>
        <li>  <a href=" " className="dropbtn">Feedback</a> </li>
         <li> <a href=" " className="dropbtn">Learn</a></li>
        <li><a class="contact-btn" href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
