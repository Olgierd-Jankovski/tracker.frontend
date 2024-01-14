import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExpensesPerCategory, getSavingsPerCategory } from '../services/statistics';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './styles/StatisticsPage.css';

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
);

const StatisticsPage = () => {
    const [displayType, setDisplayType] = useState('expenses');
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state => state.statisticsReducer.expenseAmountPerCategory);
    const savingAmountPerCategory = useSelector(state => state.statisticsReducer.savingAmountPerCategory);

    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: [],
    });

    // implementing logic to fetch data and initialize the doughnut chart option once to avoid unnecessary re-renders (and thus, unnecessary API calls)
    useEffect(() => {
        const fetchData = async () => {
            if (displayType === 'expenses' && (!expenseAmountPerCategory || expenseAmountPerCategory.length === 0)) {
                await getExpensesPerCategory(dispatch);
            }
            else if (displayType === 'savings' && (!savingAmountPerCategory || savingAmountPerCategory.length === 0)) {
                await getSavingsPerCategory(dispatch);
            }
        };

        fetchData();
    }, [displayType, dispatch, expenseAmountPerCategory, savingAmountPerCategory]);

    useEffect(() => {
        if (displayType === 'expenses') {
            setDoughnut({
                labels: expenseAmountPerCategory.map(x => x.key),
                data: expenseAmountPerCategory.map(x => x.value),
            });
        }
        else if (displayType === 'savings') {
            setDoughnut({
                labels: savingAmountPerCategory.map(x => x.key),
                data: savingAmountPerCategory.map(x => x.value),
            });
        }
    }, [expenseAmountPerCategory, savingAmountPerCategory, displayType]);

    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF0000'
            ]
        }]
    }

    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Expenses per Category'
            },

        }
    }

    const textCenter = {
        id: 'textCenter',
        beforeDraw(chart) {
            const { ctx, data, tooltip } = chart;
            const { width, height } = chart.chartArea;
            ctx.restore();

            const fontSize = 1.5;
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = 'middle';

            if (tooltip && tooltip.dataPoints && tooltip.dataPoints.length > 0) {
                const value = tooltip.dataPoints[0].formattedValue;
                const text = `${displayType === 'expenses' ? 'Euro spent: ' : 'Euro saved: '} ${value}`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
            }

            ctx.save();
        }
    };

    return (
        <div>
            <button
                onClick={() => setDisplayType('expenses')}
                className={displayType === 'expenses' ? 'active' : ''}
            >
                Expenses
            </button>
            <button
                onClick={() => setDisplayType('savings')}
                className={displayType === 'savings' ? 'active' : ''}
            >
                Savings
            </button>

            <div
                hidden={!expenseAmountPerCategory || expenseAmountPerCategory.length === 0}
                style={{
                    maxWidth: '35rem',
                    maxHeight: '35rem',
                    maring: 'auto',
                    textAlign: 'center'
                }}
            >
                <h4 style={{ marginTop: '10px' }}>
                    {displayType === 'expenses' ? 'Expenses' : 'Savings'} per Category
                </h4>

                {/* Doughnut chart */}
                <Doughnut data={data} options={options} plugins={[textCenter]} />

                {/* Legend description (assuming legend is located at the bottom) */}
                <div style={{ marginBottom: '10px' }}>
                    Fuel Type Categories
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;