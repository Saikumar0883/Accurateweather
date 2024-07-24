import React, { useState, useContext } from 'react';
import { TextField, Button, Link, Typography, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './userContext';
import { API_URL } from '../config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        setPasswordError('');
        setUserInfo(userInfo);
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRedirect(true);
      } else {
        const data = await response.json();
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            width: {
              xs: '70%',
              md: '40%',
            },
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '30px 30px',
              boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
              marginRight: '30px',
              marginLeft: '10px',
              marginTop: '20px',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <CreateIcon style={{ fontSize: 30, color: '#3f51b5' }} />
                  <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                    LOGIN
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    InputLabelProps={{
                      style: { fontSize: 14 },
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordError}
                    helperText={passwordError}
                    InputLabelProps={{
                      style: { fontSize: 14, textAlign: 'center' },
                    }}
                    InputProps={{
                      style: { textAlign: 'center' },
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ color: '#fff' }}
                  >
                    Login
                  </Button>
                </Grid>

                <Typography component="div" style={{ marginTop: '1vh', textAlign: 'center' }}>
                  <Link href="signup" variant="body2">
                    Don't have an account? SignUP
                  </Link>
                </Typography>
              </Grid>
            </form>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default LoginPage;
