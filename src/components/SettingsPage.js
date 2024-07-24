import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeoLocation from "./GeoLocation";
import { UserContext } from "./userContext";
import {
  Button,
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { API_URL } from "../config";

function SettingsPage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [open, setOpen] = useState(false);
  const [citySelected, setCitySelected] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySelected(true);
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateLocation = async () => {
    const city = selectedCity.name;
    const long = selectedCity.lon;
    const lat = selectedCity.lat; // Assuming you meant to use selectedCity.lat here
    try {
      const response = await fetch(`${API_URL}/updateMyPlocation`, {
        method: "POST",
        body: JSON.stringify({ id: userInfo.id, city, lat, long }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUserInfo({
          ...userInfo,
          MyLocation: { ...userInfo.MyLocation, city: selectedCity.name },
        });
        setCitySelected(false);
        toast.success("Location updated successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error || "Failed to update location"}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating location");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile Settings</h1>

      {/* Profile Card */}
      <Card
        sx={{
          maxWidth: 400,
          marginBottom: 2,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            Username
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {userInfo.userName}
          </Typography>
        </CardContent>
      </Card>

      {/* Email Card */}
      <Card
        sx={{
          maxWidth: 400,
          marginBottom: 2,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            Email
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {userInfo.email}
          </Typography>
        </CardContent>
      </Card>

      {/* Primary Location Card */}
      <Card
        sx={{
          maxWidth: 400,
          marginBottom: 2,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            Primary Location
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {userInfo.MyLocation ? (
              <>{userInfo.MyLocation.city}</>
            ) : (
              "You haven't added your primary location"
            )}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleOpen}
            style={{ marginTop: "10px" }}
          >
            {userInfo.MyLocation
              ? "Edit Location"
              : "Add your Primary Location"}
          </Button>
          {citySelected && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateLocation}
              style={{ marginTop: "10px" }}
            >
              Update Your Location
            </Button>
          )}
        </CardContent>
      </Card>

      {selectedCity && citySelected && (
        <div>
          <strong>Selected City:</strong> {selectedCity.name},{" "}
          {selectedCity.state}, {selectedCity.country}
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <GeoLocation onCitySelect={handleCitySelect} />
        </Box>
      </Modal>
    </div>
  );
}

export default SettingsPage;
