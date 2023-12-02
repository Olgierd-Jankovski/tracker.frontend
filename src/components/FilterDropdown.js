// FilterDropdown.js
import React, { useEffect, useState } from 'react';

const FilterDropdown = ({ label, value, onChange, fetchData }) => {
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await fetchData();
                setDropdownOptions(data);
            }
            catch (error) {
                console.log('Error in fetchOptions: ', error);
            }
        };

        fetchOptions();
    }, [fetchData]);

    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">All</option>
                {dropdownOptions && dropdownOptions.map && dropdownOptions.map((option) => ( //this check ensures that dropdownOptions is an array and has a map function
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default FilterDropdown;
