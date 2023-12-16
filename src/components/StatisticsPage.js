import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExpensesPerCategory } from '../services/statistics';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(
    ArcElement,
    Tooltip,
    Legend,
);


const StatisticsPage = () => {
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state => state.statisticsReducer.expenseAmountPerCategory);

    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: [],
    });

    useEffect(() => {
        getExpensesPerCategory(dispatch);
    }, []);

    useEffect(() => {
        setDoughnut({
            labels: expenseAmountPerCategory.map(x => x.key),
            data: expenseAmountPerCategory.map(x => x.value),
        })
    }, [expenseAmountPerCategory]);

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
            const text = `Euro spent: ${value}`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
      
            ctx.fillText(text, textX, textY);
          }
      
          ctx.save();
        }
      };

    return <div hidden={!expenseAmountPerCategory || expenseAmountPerCategory.length === 0}
        style={{ maxWidth: '35rem', maxHeight: '35rem', maring: 'auto', textAlign: 'center' }}>
        <h4 style={{ marginTop: '10px' }}>Expenses per Category</h4>

        {/* Doughnut chart */}
        <Doughnut data={data} options={options} plugins={[textCenter]} />

        {/* Legend description (assuming legend is located at the bottom) */}
        <div style={{marginBottom: '10px'}}>
            Fuel Type Categories
        </div>

    </div>
};

export default StatisticsPage;