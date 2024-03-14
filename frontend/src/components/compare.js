
import '../styles/compare.css'
import Navigation from "./navigation";
import Footer from "./footer";
import orderData from '../assets/data/orders.json';
import '../App.css'
import React, { useState, useEffect } from "react";
import ScatterPlot from './plot';


const Compare = () => {
    const [orderDataState, setOrderDataState] = useState(orderData);

    // Function to calculate both material and manufacturing footprints
    const calculateFootprints = async (item) => {
        try {
            // API endpoint
            const url = 'http://localhost:5000/api/calculate-emissions';

            // Request body parameters
            const requestBody = {
                requests: [
                    {
                        key: "string",
                        parameters: {
                            material: {
                                referenceType: "enum",
                                value: item.Material_Type // Use item data for Material_Type
                            },
                            finalMass: {
                                quantity: item.Part_Total_Mass, // Use item data for Part_Mass
                                unit: {
                                    referenceType: "enum",
                                    value: "kg"
                                }
                            },
                            manufacturingProcesses: [
                                {
                                    referenceType: "enum",
                                    value: item.Manufacturing_Process // Use item data for Manufacturing_Process
                                }
                            ],
                            manufacturingRegion: {
                                referenceType: "enum",
                                value: item.Manufacturing_Region // Default value for now
                            },
                            billetMass: {
                                quantity: item.Part_Quantity,
                                unit: {
                                    referenceType: "enum",
                                    value: "kg"
                                }
                            }
                        },
                        attributionOptions: {
                            includePerProcessBreakdowns: true
                        }
                    },
                ]
            };

            // Make POST request to API using fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody) // Send the request body
            });

            // Parse response as JSON
            const responseData = await response.json();

            // Calculate material footprint
            let sumMaxKgCO2 = 0;
            const data = responseData.responses[0].attribution.perProcessBreakdowns;
            data.forEach(process => {
                process.lifecycleSteps.forEach(step => {
                    if (step.step === 'raw_material_production' || step.step === 'raw_material_transportation') {
                        sumMaxKgCO2 += step.kgCO2e.max;
                    }
                });
            });

            // Calculate manufacturing footprint
            let maxKgCO2ForProcessing = 0;
            data.forEach(process => {
                process.lifecycleSteps.forEach(step => {
                    if (step.step === 'processing') {
                        maxKgCO2ForProcessing = step.kgCO2e.max;
                    }
                });
            });

            // Return both footprints
            return {
                material_footprint: sumMaxKgCO2.toFixed(3),
                manufacturing_footprint: maxKgCO2ForProcessing.toFixed(3)
            };
        } catch (error) {
            console.error('Error calculating footprints:', error);
            return null;
        }
    };

    useEffect(() => {
        const updateOrderData = async () => {
            

            try {
                // Iterate through each item in orderData
                const updatedOrderData = await Promise.all(orderDataState.map(async (item) => {
                    // Calculate both footprints for the item
                    const footprints = await calculateFootprints(item);
    
                    // If footprints are successfully calculated, update the item with them
                    if (footprints !== null) {
                        // Update logistic CO2 based on manufacturing region
                        let logistic_CO2;
                        if (item.manufacturingRegion === 'germany') {
                            logistic_CO2 = item.Part_Total_Mass * 0.03;
                        } else {
                            logistic_CO2 = item.Part_Total_Mass * 3.8;
                        }
    
                        // Update item with CO2 values in JSON to plot
                        item.Material_CO2 = parseFloat(footprints.material_footprint).toFixed(3);
                        item.Manufacturing_CO2 = parseFloat(footprints.manufacturing_footprint).toFixed(3);
                        item.Logistics_CO2 = logistic_CO2.toFixed(3);

                        // Calculate total footprint
                        const total_footprint = parseFloat(footprints.material_footprint) +
                                                parseFloat(footprints.manufacturing_footprint) +
                                                parseFloat(logistic_CO2);
                        
                        // Update item with total footprint
                        item.Total_CO2 = total_footprint.toFixed(3);
    
                        return item;
                    } else {
                        // Return the item without updating if footprint calculation fails
                        return item;
                    }
                }));
    
                // Update orderDataState with the updated order data
                setOrderDataState(updatedOrderData);
    
                // Log the updated order data to the console
            } catch (error) {
                console.error('Error updating order data:', error);
            }
        };

        // Call the function to update orderData
        updateOrderData();
    }, []);

    const scrollToTarget = () => {
        const targetSection = document.getElementById('targetSection');
        targetSection.scrollIntoView({ behavior: 'smooth' });
      };

    return (
        <div>
            <Navigation />
        <div className="CO2-container hubballi-regular">
        <h1>
                Welcome to Comparison Plots
            </h1>
            {/* <p>Check Console for Access Token</p> */}
            
            <h1>Price vs Carbon Estimate Plot Table</h1>
            <button className='chart-btn' onClick={() => scrollToTarget()}>Go to Chart</button>

        <table>
            <thead>
                <tr>
                    <th>Part ID</th>
                    <th>Order ID</th>
                    <th>Part Name</th>
                    <th>Price (Euros)</th>
                    <th>Total CO2 ( kgCO2) </th>
                </tr>
            </thead>
            <tbody>
                {orderDataState.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ID}</td>
                        <td>{item.OrderID}</td>
                        <td>{item.Part_Name}</td>
                        <td>{item.Price}</td>
                        <td>{item.Total_CO2}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div id='targetSection'>
        {orderDataState && <ScatterPlot data={orderDataState} />}
        </div>
        
    </div>
    <Footer/>
    </div>
    )
}

export default Compare;