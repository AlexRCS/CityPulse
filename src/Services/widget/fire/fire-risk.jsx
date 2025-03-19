import { useEffect, useState } from 'react';

const FireRiskAlert = () => {
  const API_KEY = import.meta.env.VITE_AIR_CONTROL_KEY;
  const city = 'Ovar,PT';
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`;

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(currentUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao obter os dados do clima");
        }
        return response.json();
      })
      .then(data => setWeatherData(data))
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [currentUrl]);

  const checkFireRisk = () => {
    if (!weatherData) return false;
    const { temp, humidity } = weatherData.main;
    return temp >= 30 && humidity <= 30;
  };

  const isFireRisk = checkFireRisk();
  const containerStyleDynamic = {
    ...alertContainer,
    backgroundColor: isFireRisk ? '#c71d1d' : '#4285F4'
  };

  return (
    <div style={containerStyleDynamic}>
      {error && <p style={errorStyle}>Erro: {error}</p>}
      {!error && !weatherData && <p>Carregando dados do clima...</p>}
      {!error && weatherData && (
        isFireRisk ? (
          <p style={alertTextStyle}>
            ALERTA: Risco de incêndio nas proximidades de Ovar!
          </p>
        ) : (
          <p style={safeTextStyle}>
            Não há focos de incêndio próximos em Ovar.
          </p>
        )
      )}
    </div>
  );
};

const alertContainer = {
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  border: '1px solid #ffffff',
  margin: '20px 0',
  width: '100%',
  fontFamily: 'Arial, sans-serif'
};

const alertTextStyle = {
  color: '#721c24',
  margin: 0,
  fontWeight: 'bold',
  fontSize: '16px'
};

const safeTextStyle = {
  color: '#ffffff',
  margin: 0,
  fontWeight: 'bold',
  fontSize: '16px'
};

const errorStyle = {
  color: '#dc3545',
  margin: 0,
  fontWeight: 'bold'
};

export default FireRiskAlert;

