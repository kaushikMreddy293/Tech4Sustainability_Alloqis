import React, { useState, useEffect } from "react";
import '../styles/calculator.css'
import '../App.css'
import calcData from '../assets/data/orders.json'

const Calculator = ({ item }) => {
    // State to store API response
    const [apiResponse, setApiResponse] = useState(null);

    const calculateMatFP = () => {
        if (!apiResponse) return null;

        let sumMaxKgCO2 = 0;

        // Parse the API response
        const data = apiResponse.responses[0].attribution.perProcessBreakdowns;
        data.forEach(process => {
            process.lifecycleSteps.forEach(step => {
                if (step.step === 'raw_material_production' || step.step === 'raw_material_transportation') {
                    sumMaxKgCO2 += step.kgCO2e.max;
                }
            });
        });

        // Return the sum
        return sumMaxKgCO2.toFixed(3);
    };


    const calculateManFP = (response) => {
        if (!response) return 0;

        const processBreakdowns = response.responses[0].attribution.perProcessBreakdowns;
        let maxKgCO2ForProcessing = 0;

        processBreakdowns.forEach(process => {
            process.lifecycleSteps.forEach(step => {
                if (step.step === 'processing') {
                    maxKgCO2ForProcessing = step.kgCO2e.max;
                }
            });
        });

        return maxKgCO2ForProcessing.toFixed(3);
    };

    useEffect(() => {
        // Function to make API request
        const fetchData = async () => {
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

                // Set API response in state
                setApiResponse(responseData);
                console.log(apiResponse)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData function
        fetchData();
    }, [item]); // Run effect whenever item changes

    const material_footprint = calculateMatFP();
    const manufacturing_footprint = calculateManFP(apiResponse);

    return (
        <div className="calculator-container hubballi-regular">
            <div className="flxCol carbon-container">
                <div className="carbon-box">
                    <h1>Here's the Footprint for Materials and Manufacturing</h1>
                </div>

                <div className="partName">Part Name: {item.Part_Name}</div>
                <div className="flxRow footprint">
                    <div className="material-box">
                        <div className="flxCol">
                            <div> {material_footprint} kgCO2</div>
                        </div>
                        <h4>( Material Footprint )</h4>
                    </div>
                    <div className="manufacturing-box">

                        <div className="flxCol">
                            <div>{manufacturing_footprint} kgCO2</div>
                        </div>
                        <h4>( Manufacturing Footprint )</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;
