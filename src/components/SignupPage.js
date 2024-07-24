import React, { useState, useContext } from 'react';
import { TextField, Button, Link, Typography, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { API_URL } from '../config';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { userInfo,setUserInfo } = useContext(UserContext);
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setUserNameError('');
  };
  const api = process.env.REACT_APP_API;
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password, userName }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        const Data = await response.json();
        setPasswordError('');
        setUserInfo(Data);
        console.log(userInfo)
        setRedirect(true);
      } else {
        const data = await response.json();
        setUserNameError(data.errors.userName);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }

    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            width: {
              xs: '70%', // 70% width for mobile screens
              md: '40%'   // 40% width for larger screens
            },
          }}
        >
          <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '20px 30px', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)', marginRight: '30px', marginLeft: '10px' }}>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <CreateIcon style={{ fontSize: 30, color: '#3f51b5' }} />
                  <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                    SIGN UP
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
                      style: { fontSize: 14 } // Adjust the font size as needed
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Set your desired height here
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
                    id="userName"
                    label="User Name"
                    name="userName"
                    value={userName}
                    onChange={handleUserNameChange}
                    error={!!userNameError}
                    helperText={userNameError}
                    InputLabelProps={{
                      style: { fontSize: 14 } // Adjust the font size as needed
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Set your desired height here
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
                      style: { fontSize: 14, textAlign: 'center' } // Adjust font size and center alignment
                    }}
                    InputProps={{
                      style: { textAlign: 'center' } // Center input text
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px', // Set your desired height here
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
                    Sign UP
                  </Button>
                </Grid>

                <Typography component="div" style={{ marginTop: '1vh', textAlign: 'center' }}>
                  <Link href="login" variant="body2" >
                    Already Registered? Login
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

export default Signin;
