import React, { useState } from 'react';
import axios from 'axios';
import Path from "./Path";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardHeader, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function HomePage() {
    const [name, setName] = useState(""); 
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showpass,setShowpass]=useState(true)
    const [showrepass,setShowrepass]=useState(true)
    const [tferror,setTferror]= useState(
        {
            nameerr:"",
            passerr:"",
            repasserr:""
        }
    )

    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowpass((prevShowpass) => !prevShowpass);
    };
    const handleTogglerePasswordVisibility = () => {
        setShowrepass((prevShowpass) => !prevShowpass);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        let valid = true;
        if (name === "") {
          setTferror((prevState) => ({
            ...prevState,
            nameerr: "Please enter a username",
          }));
          valid = false;
        }
        if (pass === "") {
          setTferror((prevState) => ({
            ...prevState,
            passerr: "Please enter a password",
          }));
          valid = false;
        }
        if (repass === "") {
          setTferror((prevState) => ({
            ...prevState,
            repasserr: "Please re-enter the password",
          }));
          valid = false;
        }
        if (pass !== repass) {
          setTferror((prevState) => ({
            ...prevState,
            repasserr: "Passwords do not match",
          }));
          valid = false;
        }
        if (pass.length <=10)
            {
                setTferror((prevState) => ({
                    ...prevState,
                    passerr: "Password must be more than 10 characters",
                  }));
                  valid = false;  
            }
    
        // If all fields are valid, proceed with submission
        if (valid) {
          const formData = {
            user: name,
            password: pass,
          };

        axios.post(`${Path}entries/add-name`, formData)
            .then(res => {
                console.log(res.data);
                setSuccess(res.data.message);
                setName('');
                setPass('');
                setRepass('');
                navigate('/');
            })
            .catch(err => {
                console.error('Error:', err);
                setError(err?.response?.data?.message || "An error occurred");
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Card sx={{ maxWidth: '100%', padding: '20px' }}>
                            <CardHeader
                                action={
                                    <IconButton onClick={handleBack}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                            />
                            <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Sign Up
                            </Typography>
                                <Typography>
                                    <TextField
                                        fullWidth
                                        name='userid'
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            setTferror((prevState) => ({
                                                ...prevState,
                                                nameerr: "",
                                              }));
                                        }}
                                        required
                                        label="User Name"
                                        variant="filled"
                                        error={Boolean(tferror.nameerr)}
                                        helperText={tferror.nameerr}
                                    />
                                </Typography>
                                <Typography gutterBottom>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="filled"
                                        name="password"
                                        type={showpass?"password":"text"}
                                        value={pass}
                                        onChange={(e) => {
                                            setPass(e.target.value);
                                            setTferror((prevState) => ({
                                                ...prevState,
                                                passerr: "",
                                              }));
                                        }}
                                        required
                                        error={Boolean(tferror?.passerr)}
                                        helperText={tferror?.passerr}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={handleTogglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    {showpass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Typography>
                                <Typography>
                                    <TextField
                                        fullWidth
                                        label="Re-enter Password"
                                        variant="filled"
                                        name="repassword"
                                        type={showrepass?"password":"text"}
                                        value={repass}
                                        // error={error}
                                        // helperText={error}
                                        onChange={(e) => {setRepass(e.target.value)
                                            setTferror((prevState) => ({
                                                ...prevState,
                                                repasserr: "",
                                              }));
                                        }}
                                        required
                                        error={Boolean(tferror?.repasserr)}
                                        helperText={tferror?.repasserr}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={handleTogglerePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    {showrepass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ marginTop: 2 }}
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
