import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import { API_URL } from "../config";
import "../App.css";
import { Button } from "@mui/material";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    fetch(`${API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    })
      .then(() => {
        setUserInfo(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  const userName = userInfo?.userName;

  return (
    <header
      style={{
        backgroundColor: "#5034ed",
        padding: "0 10px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link to="/" className="logo">
        Weather
      </Link>
      <nav>
        {userName ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate('/settingsPage')}
              sx={{
                textDecoration: "none",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Profile
            </Button>
            
            <Button
              variant="outlined"
              onClick={logout}
              sx={{
                textDecoration: "none",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ textDecoration: "none",color:'white' }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/signup")}
              sx={{ textDecoration: "none", color: "white" }}
            >
              Signup
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
