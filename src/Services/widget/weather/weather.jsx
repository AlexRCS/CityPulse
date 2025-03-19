import { useEffect, useState } from 'react';

const Weather = () => {
  const API_KEY = 'e5ee9023ac3fd2738c439fdf5529b3c8';
  const city = 'Ovar,PT';
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`;

  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(12);

  useEffect(() => {

    fetch(forecastUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao obter os dados da previsão");
        }
        return response.json();
      })
      .then(data => {
        setForecastData(data.list);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [forecastUrl]);


  const nowInSeconds = Math.floor(Date.now() / 1000);
  const filteredForecast = forecastData.filter(item => item.dt <= nowInSeconds + timeRange * 3600);


  const groupedData = {};
  filteredForecast.forEach(item => {
    const date = new Date(item.dt * 1000);

    const dateKey = date.toISOString().split('T')[0];
    const hour = date.getHours();
    const block = (hour < 12) ? "AM" : "PM";
    const groupKey = `${dateKey}-${block}`;
    if (!groupedData[groupKey]) {
      groupedData[groupKey] = [];
    }
    groupedData[groupKey].push(item);
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const weekday = date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '');
    const day = date.getDate();
    const month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${day} - ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  };


  const getWeatherIcon = (description) => {
    description = description.toLowerCase();
    if (description.includes("tempestade") || description.includes("trovoada")) {
      return <i className="fa-solid fa-cloud-bolt" style={{ color: "#f39c12" }}></i>;
    } else if (description.includes("chuva") && description.includes("sol")) {
      return <i className="fa-solid fa-cloud-sun-rain" style={{ color: "#3498db" }}></i>;
    } else if (description.includes("chuva") || description.includes("garoa")) {
      return <i className="fa-solid fa-cloud-rain" style={{ color: "#3498db" }}></i>;
    } else if (description.includes("neve")) {
      return <i className="fa-solid fa-snowflake" style={{ color: "#5dade2" }}></i>;
    } else if (description.includes("nevoeiro") || description.includes("embaçado") || description.includes("smog")) {
      return <i className="fa-solid fa-smog" style={{ color: "#95a5a6" }}></i>;
    } else if (description.includes("céu limpo") || description.includes("ensolarado") || description.includes("claro")) {
      return <i className="fa-solid fa-sun" style={{ color: "#f1c40f" }}></i>;
    } else if (description.includes("nublado") || description.includes("nuvem")) {
      return <i className="fa-solid fa-cloud" style={{ color: "#95a5a6" }}></i>;
    } else {
      return <i className="fa-solid fa-cloud" style={{ color: "#95a5a6" }}></i>;
    }
  };


  const aggregatedData = Object.keys(groupedData).map(groupKey => {
    const items = groupedData[groupKey];
    const totalTemp = items.reduce((sum, item) => sum + item.main.temp, 0);
    const totalHumidity = items.reduce((sum, item) => sum + item.main.humidity, 0);
    const totalWind = items.reduce((sum, item) => sum + item.wind.speed, 0);
    const count = items.length;
    const avgTemp = totalTemp / count;
    const avgHumidity = totalHumidity / count;
    const avgWind = totalWind / count;


    const freq = {};
    items.forEach(item => {
      const desc = item.weather[0].description;
      freq[desc] = (freq[desc] || 0) + 1;
    });
    let mostFrequentDesc = Object.keys(freq)[0];
    Object.keys(freq).forEach(desc => {
      if (freq[desc] > freq[mostFrequentDesc]) {
        mostFrequentDesc = desc;
      }
    });


    const formattedDate = formatDate(items[0].dt);

    const blockLabel = groupKey.endsWith("AM") ? "00h-12h" : "12h-00h";

    return {
      groupKey,
      formattedDate,
      blockLabel,
      avgTemp,
      avgHumidity,
      avgWind,
      mostFrequentDesc,
    };
  });

  aggregatedData.sort((a, b) => {
    const aDate = new Date(a.groupKey.split('-').slice(0, 3).join('-'));
    const bDate = new Date(b.groupKey.split('-').slice(0, 3).join('-'));
    if (aDate.getTime() === bDate.getTime()) {
      return a.groupKey.endsWith("AM") ? -1 : 1;
    }
    return aDate - bDate;
  });

  const timeOptions = [
    { label: '12 horas', value: 12 },
    { label: '24 horas', value: 24 },
    { label: '48 horas', value: 48 },
    { label: '72 horas', value: 72 },
    { label: '1 semana', value: 168 }
  ];

  const handleTimeRangeChange = (e) => {
    setTimeRange(Number(e.target.value));
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Clima em Ovar - Aveiro</h2>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <label htmlFor="timeRange">Selecione o intervalo de tempo: </label>
        <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange}>
          {timeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>Erro: {error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#4285f4' }}>
              <th style={thTdStyle}>Data</th>
              <th style={thTdStyle}>Período</th>
              <th style={thTdStyle}>Temperatura (°C)</th>
              <th style={thTdStyle}>Condição</th>
              <th style={thTdStyle}>Umidade (%)</th>
              <th style={thTdStyle}>Vento (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {aggregatedData.map((group, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{group.formattedDate}</td>
                <td style={thTdStyle}>{group.blockLabel}</td>
                <td style={thTdStyle}>{group.avgTemp.toFixed(1)}</td>
                <td style={thTdStyle} title={group.mostFrequentDesc}>
                  {getWeatherIcon(group.mostFrequentDesc)}
                </td>
                <td style={thTdStyle}>{group.avgHumidity.toFixed(0)}</td>
                <td style={thTdStyle}>{group.avgWind.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  margin: '0 10px',
  maxWidth: '800px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  maxHeight: '400px',
  overflowY: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thTdStyle = {
  border: '1px solid #ccc',
  padding: '5px',
  textAlign: 'center'
};

export default Weather;
