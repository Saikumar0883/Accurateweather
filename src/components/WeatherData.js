import React, { useState, useContext } from "react";
import GeoLocation from "./GeoLocation";
import { API_URL } from "../config";
import sumbro from "./sun.png";
import { UserContext } from "./userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const emojiStyle = {
  fontSize: "1.5em",
  marginRight: "5px",
  color: "inherit", // Inherit color from parent or set a specific color
};

const WeatherData = () => {
  const getTemperatureEmoji = (temperature) => {
    if (temperature >= 0 && temperature <= 5) {
      return <span style={{ color: "#00BFFF" }}>🥶</span>; // Example color
    } else if (temperature >= 6 && temperature <= 10) {
      return <span style={{ color: "#00FFFF" }}>❄</span>; // Example color
    } else if (temperature > 10 && temperature <= 15) {
      return <span style={{ color: "#00FF00" }}>🌬</span>; // Example color
    } else if (temperature > 15 && temperature <= 20) {
      return <span style={{ color: "#FFFF00" }}>🌥</span>; // Example color
    } else if (temperature > 20 && temperature <= 25) {
      return <span style={{ color: "#FFA500" }}>🌤</span>; // Example color
    } else if (temperature > 25 && temperature <= 30) {
      return <span style={{ color: "#FF4500" }}>☀</span>; // Example color
    } else if (temperature > 30 && temperature <= 35) {
      return <span style={{ color: "#FF0000" }}>🌞</span>; // Example color
    } else if (temperature > 35 && temperature <= 40) {
      return <span style={{ color: "#FF6347" }}>🔥</span>; // Example color
    } else if (temperature > 40 && temperature <= 45) {
      return <span style={{ color: "#FF1493" }}>🌡</span>; // Example color
    } else if (temperature > 45 && temperature <= 50) {
      return <span style={{ color: "#D2691E" }}>🥵</span>; // Example color
    } else if (temperature > 50 && temperature <= 55) {
      return <span style={{ color: "#8B4513" }}>♨</span>; // Example color
    } else if (temperature > 55 && temperature <= 60) {
      return <span style={{ color: "#A52A2A" }}>🌋</span>; // Example color
    } else if (temperature >= 60 && temperature <= 65) {
      return <span style={{ color: "#800000" }}>🌡</span>; // Example color
    } else {
      return <span style={{ color: "#000000" }}>🚫</span>; // Example color
    }
  };

  const getCloudEmoji = (description) => {
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes("clear")) {
      return "☀"; // Clear or mostly clear skies
    } else if (lowerDescription.includes("cloudy")) {
      return "☁"; // Mostly cloudy
    } else if (lowerDescription.includes("partly cloudy")) {
      return "⛅"; // Partly cloudy
    } else if (lowerDescription.includes("overcast")) {
      return "☁️"; // Overcast clouds
    } else if (lowerDescription.includes("drizzle")) {
      return "🌦"; // Light drizzle
    } else if (
      lowerDescription.includes("rain") ||
      lowerDescription.includes("showers")
    ) {
      return "🌧"; // Rain showers
    } else if (lowerDescription.includes("thunderstorm")) {
      return "⛈"; // Thunderstorm
    } else if (lowerDescription.includes("snow")) {
      return "🌨"; // Snow
    } else if (lowerDescription.includes("fog")) {
      return "🌫"; // Fog
    } else {
      return "🌈"; // Default or unknown weather
    }
  };

  const { userInfo } = useContext(UserContext);
  console.log(userInfo);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(12,12,0)",
    minHeight: "100vh",
    padding: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#27AE60",
    color: "white",
    border: "none",
    padding: "15px 20px",
    borderRadius: "20px",
    marginLeft: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
  };

  const cardStyle = {
    backgroundColor: "#333",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
    margin: "10px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const weatherNowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const temperatureStyle = {
    fontSize: "3em",
    margin: "10px 0",
  };


  const forecastSectionStyle = {
    backgroundColor: "#444",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleClick = async () => {
    if (!selectedCity) {
      console.error("No city selected");
      return;
    }
    const { lat, lon, name: city } = selectedCity;
    const loadingToast = toast.loading("Fetching weather data...");

    try {
      const response = await fetch(
        `${API_URL}/current-weather?lat=${lat}&long=${lon}&city=${city}`
      );
      if (response.ok) {
        const val = await response.json();
        setWeatherData(val);
        toast.update(loadingToast, {
          render: "Weather data fetched successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToast, {
          render: "Failed to fetch weather data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.update(loadingToast, {
        render: "Error fetching weather data.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleClick1 = async () => {
    console.log(userInfo);
    const lat = userInfo.MyLocation.latitude;
    const lon = userInfo.MyLocation.longitude;
    const city = userInfo.MyLocation.city;
    const loadingToast = toast.loading("Fetching weather data...");

    try {
      const response = await fetch(
        `${API_URL}/current-weather?lat=${lat}&long=${lon}&city=${city}`
      );
      if (response.ok) {
        const val = await response.json();
        setWeatherData(val);
        toast.update(loadingToast, {
          render: "Weather data fetched successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToast, {
          render: "Failed to fetch weather data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.update(loadingToast, {
        render: "Error fetching weather data.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short", // Short form of weekday (e.g., Mon, Tue)
      day: "2-digit", // Day of the month (e.g., 01, 23)
      month: "short", // Short form of month (e.g., Jan, Feb)
    };
    return date.toLocaleDateString("en-US", options);
  };

  const emojiStyle = {
    fontSize: "1.5em",
    marginRight: "5px",
    color: "#00BFFF",
  };
  return (
    <div style={appStyle}>
      {userInfo && (
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {userInfo.MyLocation && (
          <button style={{ ...buttonStyle }} onClick={handleClick1}>
            Get Weather for {userInfo.MyLocation.city}
          </button>
          )}
        </div>
      )}

      <div className="Buttons">
        <GeoLocation onCitySelect={handleCitySelect} />
        <button
           style={{
            backgroundColor: !selectedCity ? "#aaa" : "#27AE60", // Dim color if disabled
            color: !selectedCity ? "#666" : "white", // Dim text color if disabled
            border: "none",
            padding: "15px 20px",
            borderRadius: "20px",
            marginLeft: "10px",
            cursor: !selectedCity ? "not-allowed" : "pointer", // Change cursor if disabled
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            opacity: !selectedCity ? 0.5 : 1, // Dim the button if disabled
          }}
          onClick={handleClick}
          disabled={!selectedCity}
        >
          Get Weather
        </button>
      </div>

      {weatherData && (
        <>
          <main style={mainStyle}>
            <div className="Current">
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <div style={{ height: "150%" }}>
                  <h1 style={{ fontSize: "1.5em" }}>{weatherData.city}</h1>
                  <h2 style={{ fontSize: "0.8em" }}>
                    {weatherData
                      ? new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "7:00"}
                  </h2>
                  <p style={{ fontSize: "1.2em" }}>
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {weatherData && (
                <div
                  style={{ ...cardStyle, ...weatherNowStyle, margin: "25px" }}
                >
                  <div style={{ height: "150%" }}>
                    <div>
                      <h1 style={temperatureStyle}>
                        {weatherData.current.temperature}°C
                        {getTemperatureEmoji(weatherData.current.temperature)}
                      </h1>
                      <p>CloudCovere: {weatherData.current.cloudcover}</p>
                    </div>
                    <div>
                      <p>
                        Humidity: {weatherData.current.humidity}%{" "}
                        <span style={emojiStyle}>☔</span>
                      </p>
                      <p>
                        Description: {weatherData.current.description}{" "}
                        <span style={emojiStyle}>☁</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {weatherData && (
              <div className="forecastStyle">
                <div style={forecastSectionStyle}>
                  <div>
                    <h3
                      style={{
                        textAlign: "center",
                      }}
                    >
                      3 Hourly Forecast:
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "0",
                        padding: "0",
                        paddingTop: "10px",
                      }}
                    >
                      {weatherData.hourlyForecast.hourlyForecast.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              backgroundColor: "#444",
                              padding: "5px", // Padding around the text
                              borderRadius: "10px", // Rounded corners
                              display: "flex", // Flexbox for alignment
                              alignItems: "center", // Center items vertically
                              justifyContent: "space-evenly", // Space items out
                              fontSize: "0.8em", // Slightly larger text
                              // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
                            }}
                          >
                            <span>
                              {item.time} - {item.temperature}°C
                              {getTemperatureEmoji(item.temperature)}
                            </span>
                            {item.description.toUpperCase()} -{" "}
                            {getCloudEmoji(item.description)}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div style={forecastSectionStyle}>
                  <div>
                    <h3 style={{ textAlign: "center" }}>10 Days Forecast:</h3>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "0",
                        padding: "0",
                        paddingTop: "10px",
                      }}
                    >
                      {weatherData.tenDaysForecast.tenDaysForecast.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              backgroundColor: "#444",
                              borderRadius: "10px", 
                              display: "flex",
                              alignItems: "center", 
                              justifyContent: "space-evenly",
                              fontSize: "0.8em",
                              marginBottom: "10px", 
                            }}
                          >
                            <span>
                              {formatDate(item.date)} {item.temperature}°C
                              {getTemperatureEmoji(item.temperature)}
                            </span>
                            {item.description.toUpperCase()} -{" "}
                            {getCloudEmoji(item.description)}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
      {!weatherData && (
        <>
          <h3 style={{ color: "white", marginBottom: "30px" }}>
            Hello Buddy! Enter any place to see Weather conditions
          </h3>
          <img src={sumbro} />
        </>
      )}
    </div>
  );
};

export default WeatherData;
