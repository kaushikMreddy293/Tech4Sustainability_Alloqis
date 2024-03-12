import React from 'react';
import '../styles/energy_mix.css';
import '../App.css'
import GflagIcon from '../assets/germany-flag-icon.svg'
import USFlagIcon from '../assets/united-states-flag-icon.svg';
const EnergyMixComponent = ({ item }) => {



    return (

        <div className='enery-mix-container hubballi-regular flxCol'>
            <h1>Find the Energy Mix Here</h1>
            <div className='flxRow'>
                <div className='flxCol tech-side'>
                    <p className='heading'>Technology</p>
                    <p>{item.AMNtechnology}</p>
                </div>
                <div className='vertical-line'></div>
                <div className='flxCol mix-side'>
                    <p className='heading'>Country Enegry Mix</p>
                   <p> <img src={item.Supplier_Country === 'Germany' ? GflagIcon : USFlagIcon} alt="Flag Icon" className="icon" />
                    {item.Supplier_Country} </p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={item.Supplier_energymix}
                        disabled

                    />
                    <div className="tooltip">{item.Supplier_energymix} </div>
                    <p>kg CO2 /kWh</p>
                </div>
            </div>

        </div>
    );
};

export default EnergyMixComponent;
