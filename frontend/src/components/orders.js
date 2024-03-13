import React, { useState, useEffect } from "react";
import '../styles/orders.css';
import Navigation from "./navigation";
import Footer from "./footer";
import jsonData from '../assets/data/orders.json'
import Calculator from "./calculator";
import '../App.css'
import { Link } from 'react-router-dom';
import PositionStackComponent from "./position";
import EnergyMixComponent from "./energy_mix";

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
            <p>(Click on Calculate to find the CO2 estimates)</p>
            <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Part Name</th>
            <th>Material Type</th>
            <th>Part Density g/cm3</th>
            <th>Part Volume cm3 </th>
            <th>Part Quantity</th>
            <th>Part Mass Kg</th>
            <th>Part Price (Euros) </th>
            <th>Manufacturing Process</th>
            <th>Manufacturing Region</th>
            <th>Calculate CO2</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.ID}>
              <td>{item.OrderID}</td>
              <td>{item.Part_Name}</td>
              <td>{item.Material}</td>
              <td>{item.Part_Density}</td>
              <td>{item.Part_Volume}</td>
              <td>{item.Part_Quantity}</td>
              <td>{item.Part_Total_Mass}</td>
              <td>{item.Price}</td>
              <td>{item.AMNtechnology}</td>
              <td>{item.Supplier_Country}</td>
              <td>
              <button className="calc-btn" onClick={() => handleCalculate(item)}>Calculate</button> {/* Use Link to navigate */}
                </td> {/* Pass the item to handleCalculate function */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
          <div className="component-container"> 
          {selectedItem && <Calculator item={selectedItem} />} 
      {selectedItem && <EnergyMixComponent item={selectedItem}/>}
      {selectedItem && <PositionStackComponent item={selectedItem} />} 
          </div>
      
            <Footer/>
            
        </div>
    );
};

export default Orders;
