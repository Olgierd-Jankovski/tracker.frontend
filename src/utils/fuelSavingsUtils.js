// This function takes in the selectedLocation, fillAmount, and averagePrice and calculates the savings. The savings are calculated by subtracting the average price from the location price and multiplying the result by the fill amount. The result is the savings.
// The renderSavingsColor function takes in the savings and returns the color that should be used to display the savings. If the savings are positive, the color is green. If the savings are negative, the color is red. If the savings are zero, the color is grey.

export const calculateSavings = (selectedLocation, fillAmount, averagePrice) => {
    if (!fillAmount) {
        return 'N/A';
    }
    
    if (selectedLocation) {
        const locationPrice = selectedLocation.price;
        const savings = (averagePrice - locationPrice) * fillAmount;
        return savings;
    }


    return 0;
};


export const renderSavingsColor = (savings) => {

    if (savings > 0) {
        return 'green';
    }
    else if (savings < 0) {
        return 'red';
    }
    else {
        return 'grey';
    }
};