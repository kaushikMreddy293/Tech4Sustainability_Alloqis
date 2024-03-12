import React, { useState, useEffect } from "react";
import '../styles/orders.css';
import Navigation from "./navigation";
import Footer from "./footer";
import jsonData from '../assets/data/orders.json'
import Calculator from "./calculator";
import '../App.css'
import { Link } from 'react-router-dom';

const Orders = () => {

    const [selectedItem, setSelectedItem] = useState(null);
   const orders = jsonData

   const handleCalculate = (item) => {
    setSelectedItem(item); // Set the selected item
 };


    return (
        <div >
            <Navigation/>
            <div  className="order-container  hubballi-regular">
            <h1>
                Welcome to Orders
            </h1>
            {/* <p>Check Console for Access Token</p> */}
            
            <h1>Orders Table</h1>
            <table>
        <thead>
          <tr>
            <th>Part ID</th>
            <th>Part Name</th>
            <th>Material Type</th>
            <th>Part Density</th>
            <th>Part Volume</th>
            <th>Part Mass</th>
            <th>Part Quantity</th>
            <th>Part Total Mass</th>
            <th>Manufacturing Process</th>
            <th>Manufacturing Region</th>
            <th>Calculate CO2</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.Part_ID}>
              <td>{item.Part_ID}</td>
              <td>{item.Part_Name}</td>
              <td>{item.Material_Type}</td>
              <td>{item.Part_Density}</td>
              <td>{item.Part_Volume}</td>
              <td>{item.Part_Mass}</td>
              <td>{item.Part_Quantity}</td>
              <td>{item.Part_Total_Mass}</td>
              <td>{item.Manufacturing_Process}</td>
              <td>{item.Manufacturing_Region}</td>
              <td>
              <button onClick={() => handleCalculate(item)}>Calculate</button> {/* Use Link to navigate */}
                </td> {/* Pass the item to handleCalculate function */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedItem && <Calculator item={selectedItem} />} 
            <Footer/>
            
        </div>
    );
};

export default Orders;
