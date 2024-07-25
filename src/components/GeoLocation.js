import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { GL_API, APPID } from "../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GeoLocation = ({ onCitySelect }) => {
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState([]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    try {
      console.log(`${GL_API}?q=${city}&limit=10&appid=${APPID}`);
      const response = await fetch(
        `${GL_API}?q=${city}&limit=10&appid=${APPID}`
      );
      const data = await response.json();
      if (data.length === 0) {
        toast.info("No results found. Try using a correct city name.");
      }
      setLocationData(data); // Directly setting the array response
    } catch (error) {
      console.error("Error fetching the location data:", error);
      toast.error("An error occurred while fetching location data.");
    }
  };

  const handleCitySelect = (city) => {
    onCitySelect(city); // Call the parent callback function
    setLocationData([]); // Clear the location data to hide the list
  };

  const decodeCountryCode = (code) => {
    const countryCodes = {
      US: "United States",
      IN: "India",
      CA: "Canada",
      GB: "United Kingdom",
      AU: "Australia",
      DE: "Germany",
      FR: "France",
      IT: "Italy",
      ES: "Spain",
      JP: "Japan",
      CN: "China",
      BR: "Brazil",
      RU: "Russia",
      MX: "Mexico",
      ZA: "South Africa",
      NG: "Nigeria",
      EG: "Egypt",
      SA: "Saudi Arabia",
      AE: "United Arab Emirates",
      KR: "South Korea",
      SE: "Sweden",
      NO: "Norway",
      FI: "Finland",
      DK: "Denmark",
      NL: "Netherlands",
      BE: "Belgium",
      CH: "Switzerland",
      AT: "Austria",
      PT: "Portugal",
      GR: "Greece",
      TR: "Turkey",
      PL: "Poland",
      CZ: "Czech Republic",
      HU: "Hungary",
      RO: "Romania",
      BG: "Bulgaria",
      HR: "Croatia",
      RS: "Serbia",
      SI: "Slovenia",
      SK: "Slovakia",
      UA: "Ukraine",
      BY: "Belarus",
      IL: "Israel",
      IR: "Iran",
      IQ: "Iraq",
      PK: "Pakistan",
      BD: "Bangladesh",
      LK: "Sri Lanka",
      NP: "Nepal",
      MM: "Myanmar",
      TH: "Thailand",
      VN: "Vietnam",
      ID: "Indonesia",
      MY: "Malaysia",
      SG: "Singapore",
      PH: "Philippines",
      NZ: "New Zealand",
      AR: "Argentina",
      CL: "Chile",
      CO: "Colombia",
      PE: "Peru",
      VE: "Venezuela",
      UY: "Uruguay",
      PY: "Paraguay",
      BO: "Bolivia",
      CU: "Cuba",
      DO: "Dominican Republic",
      HT: "Haiti",
      JM: "Jamaica",
      TT: "Trinidad and Tobago",
      BB: "Barbados",
      BS: "Bahamas",
      BZ: "Belize",
      GT: "Guatemala",
      HN: "Honduras",
      SV: "El Salvador",
      NI: "Nicaragua",
      CR: "Costa Rica",
      PA: "Panama",
      LY: "Libya",
      DZ: "Algeria",
      MA: "Morocco",
      TN: "Tunisia",
      KE: "Kenya",
      UG: "Uganda",
      TZ: "Tanzania",
      GH: "Ghana",
      CI: "Ivory Coast",
      SN: "Senegal",
      ML: "Mali",
      BF: "Burkina Faso",
      CM: "Cameroon",
      ET: "Ethiopia",
      ZW: "Zimbabwe",
      ZM: "Zambia",
      MZ: "Mozambique",
    };
    return countryCodes[code] || code;
  };

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter nearby city name"
        style={{
          flexGrow: 1,
          padding: "15px",
          border: "none",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: "#27AE60",
          color: "white",
          border: "none",
          padding: "15px 28px",
          borderRadius: "20px",
          marginLeft: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Search
      </button>

      {locationData.length > 0 && (
        <List
          style={{
            position: "absolute",
            zIndex: 100,
            top: "calc(20% + 80px)",
            left: 0,
            right: 0,
            width: "50%",
            maxHeight: "50%",
            overflowY: "auto",
            borderRadius: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginLeft: '12%',
            color:'black'
          }}
        >
          {locationData.map((location, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleCitySelect(location)}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "0px",
                fontSize: "12px",
                transition: "background-color 0.3s ease",
                '&:hover': {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemText
                primary={`${location.name}, ${decodeCountryCode(
                  location.country
                )}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default GeoLocation;
