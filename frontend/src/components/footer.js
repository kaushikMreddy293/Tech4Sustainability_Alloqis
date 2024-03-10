import React from "react";
import '../styles/footer.css'
import '../App.css';
import Navigation from "./navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import carGreenImage from '../assets/car_green.jpg';


const Footer = () => {
    return (
        <footer>
            <div className="footer-container hubballi-regular">
                {/* {Column 0} */}
            <div className="footer-column">
                    <h3>Logo</h3>
                    <img src={carGreenImage} alt="Background" className="logo-img" />
                </div>
                {/* Column 1 */}
                <div className="footer-column">
                    <h3>Site Map</h3>
                    <ul>
                        <li>Home</li>
                        <li>City</li>
                        <li>Community</li>
                        <li>Donate</li>
                        <li>Learn</li>
                    </ul>
                </div>
                {/* Column 2 */}
                <div className="footer-column">
                    <h3>Organization</h3>
                    <ul>
                        <li>Help & Support</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Partners</li>
                        <li>Careers</li>
                    </ul>
                </div>
                {/* Column 3 */}
                <div className="footer-column">
                    <h3>Newsletter</h3>
                    <input type="text" className="newsletter-input" placeholder="Enter your email" />
                    <button className="newsletter-button">Subscribe</button>
                    {/* Social media icons */}
                    <div className="social-icons">
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;