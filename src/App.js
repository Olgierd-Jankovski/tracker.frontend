import React from 'react';
import './App.css';
import { PricesTable } from './components/PricesTable';
import { NewPriceModal } from './components/PriceModal';
import { ToastContainer } from 'react-toastify';
import FilterDropdown from './components/FilterDropdown';
import { getTypes} from './services/types';
import { getStationNames } from './services/stations';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';


const App = () => {
  const [selectedStation, setSelectedStation] = React.useState('All');
  const [selectedFuelType, setSelectedFuelType] = React.useState('All');
  const [dropdownOptions, setDropdownOptions] = React.useState([]);


  const handleStationChange = (station) => {
    setSelectedStation(station);
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelType(fuelType);
  };


  return (
    <div className="App">
      <SignInPage />
      {/* <h3> Gas Station Prices</h3>
      <div style={{ maxWidth: '70%', margin: 'auto' }}>
        <ToastContainer />
        <div style={{ textAlign: 'right' }}>
          <NewPriceModal />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <FilterDropdown
            label="Gas Station"
            //options={['Neste', 'Circle K']}
            value={selectedStation}
            onChange={handleStationChange}
            fetchData={getStationNames}
          />
          <FilterDropdown
            label="Fuel Type"
            //options={['95', '98', 'D']}
            value={selectedFuelType}
            onChange={handleFuelTypeChange}
            fetchData={getTypes}
          />
        </div>
        <PricesTable selectedStation={selectedStation} selectedFuelType={selectedFuelType}/>
      </div> */}
    </div >
  );
}

export default App;
