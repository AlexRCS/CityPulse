import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_AIR_CONTROL_KEY;
const LAT = 40.8613;
const LNG = -8.6408;

const getColorFromAQI = (aqi) => {
    if (aqi <= 1) return 'rgb(0, 123, 255)';
    if (aqi === 2) return 'rgb(0, 255, 55)';
    if (aqi === 3) return 'rgb(255,255,0)';
    if (aqi === 4) return 'rgb(255,69,0)';
    if (aqi >= 5) return 'rgb(255,0,0)';
};

const AirQualityChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAirQualityForecast = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${LAT}&lon=${LNG}&appid=${OPENWEATHERMAP_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                const labels = [];
                const aqiValues = [];
                if (data.list && Array.isArray(data.list)) {
                    data.list.forEach((item) => {
                        const dt = new Date(item.dt * 1000);
                        const hours = dt.getHours().toString().padStart(2, '0');
                        const minutes = dt.getMinutes().toString().padStart(2, '0');
                        labels.push(`${hours}:${minutes}`);
                        aqiValues.push(item.main.aqi);
                    });
                }
                const pointColors = aqiValues.map(aqi => getColorFromAQI(aqi));
                const preparedData = {
                    labels,
                    datasets: [
                        {
                            label: '🔵 Muito Bom - 🟢 Bom - 🟡 Razoavel - 🟠Ruim - 🔴 Muito Ruim',
                            data: aqiValues,
                            borderColor: '#4285f4',
                            borderWidth: 3,
                            tension: 0.,
                            fill: false,
                            pointBackgroundColor: pointColors,
                            pointBorderColor: '#fff',
                            pointRadius: 8,
                        },
                    ],
                };
                setChartData(preparedData);
            } catch (error) {
                console.error('Erro ao buscar dados de qualidade do ar:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAirQualityForecast();
    }, []);

    if (loading) return <div>Carregando dados...</div>;
    if (!chartData) return <div>Sem dados disponíveis.</div>;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                onClick: () => {},
                labels: { color: 'black', font: { size: 12 }, boxWidth: 0 },
            },
            title: {
                display: true,
                text: ['Previsão de Qualidade do Ar', 'Ovar - Aveiro, Portugal'],
                font: { size: 18, family: 'Arial', weight: 'bold' },
                color: 'black',
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            x: {
                ticks: { color: 'black', font: { size: 12 } },
                grid: { color: 'rgba(200,200,200,0.2)' },
            },
            y: {
                ticks: { color: 'black', font: { size: 12 }, beginAtZero: true, stepSize: 1, callback: (value) => value },
                grid: { color: 'rgba(200,200,200,0.2)' },
            },
        },
        elements: {
            line: {
                segment: {
                    borderColor: (ctx) => {
                        const { p0, p1 } = ctx;
                        const avgAqi = (p0.parsed.y + p1.parsed.y) / 2;
                        return getColorFromAQI(Math.round(avgAqi));
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', margin: '10px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default AirQualityChart;
