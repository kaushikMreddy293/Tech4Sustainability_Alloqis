import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles/position.css'
const PositionStackComponent = ({ item }) => {
    const [encodedCustomerAddress, setEncodedCustomerAddress] = useState('');
    const [encodedSupplierAddress, setEncodedSupplierAddress] = useState('');
    const [customerLocationData, setCustomerLocationData] = useState(null);
    const [supplierLocationData, setSupplierLocationData] = useState(null);
    const [distance, setDistance] = useState(null);
    const [isCalculateDisabled, setIsCalculateDisabled] = useState(true);
    const [carbonEstimate, setCarbonEstimate] = useState(null);
    const [isCalculateCarbonEstimate, setIsCalculateCarbonEstimate] = useState(true);
    const [transportMethodUsed, setTransportMethodUsed] = useState(null);

    // Function to calculate distance between two points using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth radius in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    // Function to convert degrees to radians
    const toRadians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    //Function to get Logistics estimate
    const handleGetCarbonEstimate = (transportMethod) => {
        const API_KEY = 'vXdxHdGFSw4ojlAXFogQ';
        setTransportMethodUsed(transportMethod);

        const requestData = {
            type: 'shipping',
            weight_value: item.Part_Total_Mass,
            weight_unit: 'kg',
            distance_value: distance,
            distance_unit: 'km',
            transport_method: transportMethod
        };

        fetch('https://www.carboninterface.com/api/v1/estimates', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            setCarbonEstimate(data);
        })
        .catch(error => {
            console.error('Error fetching carbon estimate:', error);
            // Handle error here
        });
    };

    const fetchLocationData = (apiUrl, setLocationData) => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setLocationData(data[0]);
            })
            .catch(error => {
                console.error('Error fetching geocode data:', error);
            });
    };

    const encodeAddress = (address, city, postalCode) => {
        return encodeURIComponent(`${address}, ${city}, ${postalCode}`)
            .replace(/%20/g, ".%20")
            .replace(/%2C/g, "%20,%20");
    };

    useEffect(() => {
        // Reset location data when item changes
        setCustomerLocationData(null);
        setSupplierLocationData(null);
        setDistance(null);
        setCarbonEstimate(null);

        // Encode customer and supplier addresses when item changes
        const encodedCustomerAddress = encodeAddress(item.Customer_address, item.Customer_City, item.Customer_Postal_Code);
        setEncodedCustomerAddress(encodedCustomerAddress);

        const encodedSupplierAddress = encodeAddress(item.Supplier_Address, item.Supplier_City, item.Supplier_Postal_Code);
        setEncodedSupplierAddress(encodedSupplierAddress);
    }, [item]);

    const handleCustomerButtonClick = () => {
        if (encodedCustomerAddress) {
            const apiUrl = `https://geocode.maps.co/search?q=${encodedCustomerAddress}&api_key=65f086171ba9c687264841spz5a99df`;
            fetchLocationData(apiUrl, setCustomerLocationData);
        }
    };

    const handleSupplierButtonClick = () => {
        if (encodedSupplierAddress) {
            const apiUrl = `https://geocode.maps.co/search?q=${encodedSupplierAddress}&api_key=65f086171ba9c687264841spz5a99df`;
            fetchLocationData(apiUrl, setSupplierLocationData);
        }
    };

    const handleCalculateDistance = () => {
        if (customerLocationData && supplierLocationData) {
            const distance = calculateDistance(customerLocationData.lat, customerLocationData.lon, supplierLocationData.lat, supplierLocationData.lon);
            setDistance(distance.toFixed(2)); // Round to 2 decimal places
        }
    };

    // Check if both customer and supplier locations exist
    useEffect(() => {
        setIsCalculateDisabled(!(customerLocationData && supplierLocationData));
    }, [customerLocationData, supplierLocationData]);

    useEffect(() => {
        setIsCalculateCarbonEstimate(!distance)} ,[distance]);
       

    return (
        <div className="position-container flxCol hubballi-regular">
            <h1>Let's Find the Footprint for Logistics</h1>
            <div>
                <h2>Customer Location</h2>
                <button onClick={handleCustomerButtonClick}>Fetch Customer Location</button>
                {customerLocationData && (
                    <div>
                        <p>
                            <strong>Address :</strong> {customerLocationData.display_name}
                        </p>
                        <p>
                            <strong>Latitude:</strong> {customerLocationData.lat}
                        </p>
                        <p>
                            <strong>Longitude:</strong> {customerLocationData.lon}
                        </p>
                    </div>
                )}
            </div>
            <div>
                <h2>Supplier Location</h2>
                <button onClick={handleSupplierButtonClick}>Fetch Supplier Location</button>
                {supplierLocationData && (
                    <div>
                        <p>
                            <strong>Address :</strong> {supplierLocationData.display_name}
                        </p>
                        <p>
                            <strong>Latitude:</strong> {supplierLocationData.lat}
                        </p>
                        <p>
                            <strong>Longitude:</strong> {supplierLocationData.lon}
                        </p>
                    </div>
                )}
            </div>
            <div>
                <h2>Distance Between Customer and Supplier </h2>
                <button onClick={handleCalculateDistance} disabled={isCalculateDisabled}>Calculate Distance</button>
                {distance && (
                    <p>
                        <strong>Distance:</strong> {distance} km
                    </p>
                )}
            </div>  

         <div>
            <h2>Get Logistic Footprint</h2>
            <div className="estimate-btns ">
                <button className="estimate-btn " onClick={() => handleGetCarbonEstimate('truck')} disabled={isCalculateCarbonEstimate}>Get Truck Estimate</button>
                <button className="estimate-btn " onClick={() => handleGetCarbonEstimate('plane')} disabled={isCalculateCarbonEstimate}>Get Plane Estimate</button>
                <button className="estimate-btn " onClick={() => handleGetCarbonEstimate('ship')} disabled={isCalculateCarbonEstimate}>Get Ship Estimate</button>
                <button className="estimate-btn " onClick={() => handleGetCarbonEstimate('train')} disabled={isCalculateCarbonEstimate}>Get Train Estimate</button>
            </div>
            {carbonEstimate && (
                <div className="logistic-box">
                        <div className="flxCol">
                            <div>{carbonEstimate.data.attributes.carbon_kg} kgCO2</div>
                        </div>
                        <p>{transportMethodUsed}</p>
                        <h4>( Logistics Footprint )</h4>
                </div>
            )}
        </div>      
        
        </div>
    );
};

export default PositionStackComponent;
