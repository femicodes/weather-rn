import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Weather } from './components/Weather';
import { fetchWeather } from './utils/api';

export default function App() {
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude)
          .then(res => {
            setTemperature(res.main.temp)
            setWeatherCondition(res.weather[0].main)
          });
      },
      error => {
        setError('Error getting weather conditions', error.message);
      }
    )
  }, []);

  if (error !== null) {
    return <View>{error.message}</View>
  }

  return (
    <View style={styles.container}>
      {weatherCondition && temperature ? (
        <Weather weather={weatherCondition} temperature={temperature} />
      ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching the weather</Text>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
