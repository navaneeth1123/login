import React, { useState } from 'react';
import axios from 'axios';
import Path from "./Path";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [name, setName] = useState(""); 
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handlePassChange = () => {
        // Validate inputs
        if (name === "" || pass === "" || repass === "") {
            setError("Please fill all the fields");
            return;
        }

        // Check if passwords match
        if (pass !== repass) {
            setError("Passwords do not match");
            return;
        }

        const formData = {
            user: name,
            password: pass,
        };

        // Make API call to change password
        axios.put(`${Path}entries/change-pass`, formData)
            .then(res => {
                console.log(res.data);
                handleBack(); // Navigate back after successful password change
            })
            .catch(err => {
                console.error(err);
                setError(err?.response?.data?.message || "An error occurred");
                setTimeout(() => {
                    setError("");
                }, 3000);
            });
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
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
                                Forget Password
                            </Typography>
                                <Typography>
                                    <TextField
                                        fullWidth
                                        name='userid'
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        label="Username"
                                        placeholder='Enter Username'
                                        variant="filled"
                                    />
                                </Typography>
                                <Typography gutterBottom>
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        placeholder='Enter New Password'
                                        variant="filled"
                                        name="password"
                                        type='password'
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        required
                                    />
                                </Typography>
                                <Typography>
                                    <TextField
                                        fullWidth
                                        label="Re-enter Password"
                                        variant="filled"
                                        name="repassword"
                                        type='password'
                                        value={repass}
                                        onChange={(e) => setRepass(e.target.value)}
                                        required
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={handlePassChange}
                                    disabled={name === "" || pass === "" || repass === ""}
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
