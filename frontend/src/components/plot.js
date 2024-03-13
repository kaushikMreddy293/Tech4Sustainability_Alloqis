import React from 'react';
import Plot from 'react-plotly.js';
import '../App.css'
import '../styles/plot.css'

const ScatterPlot = ({ data }) => {
    
    const prices = data.map(item => item.Price);
    const carbonEstimates = data.map(item => item.Total_CO2);
    const partNames = data.map(item => item.Part_Name);
    const regions = data.map(item => item.Supplier_Country);

    const plotData = [{
        x: prices,
        y: carbonEstimates,
        mode: 'markers',
        type: 'scatter',
        marker: { color: data.map((item,index) => getColorByRegion(regions[index])), },
        text: data.map((item, index) => `${partNames[index]} - ${regions[index]}`), // Use part names for tooltips
        hoverinfo: 'text+country+x+y', // Show part name, price, and carbon estimate on hover
    }];

    const layout = {
        title: 'Scatter Plot of Price vs Carbon Estimate',
        xaxis: { title: 'Price' },
        yaxis: { title: 'Carbon Estimate (kgCO2)' },
       
    };

    return (
        <div>
        <div className='plot-container hubballi-regular'>
            <Plot
                data={plotData}
                layout={layout}
                style={{ width: '100%', height: '500px' }}
            />
        </div>
        <div className="legend">
            <div className="legend-item">
                <div className="legend-box" style={{ backgroundColor: 'green' }}></div>
                <div className="legend-text">Germany</div>
            </div>
            <div className="legend-item">
                <div className="legend-box" style={{ backgroundColor: 'red' }}></div>
                <div className="legend-text">United States</div>
            </div>
        </div>
    </div>
    );
};

export default ScatterPlot;

const getColorByRegion = (region) => {
    // Define color mappings for each region
    const colorMap = {
        'Germany': 'green',
        'United States': 'red',
        // Add more regions and colors as needed
    };

    // Return color based on region, default to black if region not found
    return colorMap[region] || 'black';
};