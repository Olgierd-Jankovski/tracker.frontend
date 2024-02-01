interface Location {
    id: number;
    name: string;
    price: number;
}

export const calculateSavings = (
    selectedLocation: Location | null,
    fillAmount: number,
    averagePrice: number
): number | 'N/A' => {
    if (!fillAmount) {
        return 'N/A';
    }

    if (selectedLocation) {
        const locationPrice: number = selectedLocation.price;
        const savings: number = (averagePrice - locationPrice) * fillAmount;
        return savings;
    }

    return 0;
}

export const renderSavingsColor = (savings: number | 'N/A'): string => {
    if (savings === 'N/A') {
        return 'grey';
    }
    else if (savings > 0) {
        return 'green';
    }
    else if (savings < 0) {
        return 'red';
    }
    else {
        return 'grey';
    }
}