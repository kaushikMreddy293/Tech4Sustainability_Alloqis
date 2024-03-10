import React from "react";
import '../styles/calculator.css'
import Navigation from "./navigation";
import Footer from "./footer";

const Calculator = () => {
    return (
        <div>
            <Navigation />
            <h1>Welcome to the Calculator</h1>
            <Footer/>
        </div>
    )
}

export default Calculator;