import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [name, setName] = useState(""); 
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get(`${Path}entries/get-name`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    const handleLogin = () => {
        const formData = {
            user: name,
            password: pass
        };

        axios.post(`${Path}entries/login`, formData)
            .then(res => {
                localStorage.setItem('user', name);
                navigate('/Main-Page');
            })
            .catch(err => {
                setError(err?.response?.data?.message || "An error occurred");
                setTimeout(() => {
                    setError(""); 
                }, 3000); 
            });
    };

    const handleSignup = () => {
        navigate('/sign-up');
    };

    const handleForget = () => {
        navigate('/forget-pass');
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Card sx={{ maxWidth: '100%', padding: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                fullWidth
                                label="User Name"
                                variant="filled"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="filled"
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                sx={{ marginBottom: 2 }}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                                disabled={name === "" || pass === ""}
                                fullWidth
                                sx={{ marginBottom: 1 }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSignup}
                                fullWidth
                                sx={{ marginBottom: 1 }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleForget}
                                fullWidth
                                sx={{ marginBottom: 1 }}
                            >
                                Forget
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                {/* <Grid item xs={12} sm={8} md={6} lg={4}>
                    <div>
                        {data.map(entry => (
                            <p key={entry._id}>{entry.user},{entry.password}</p>
                        ))}
                    </div>
                </Grid> */}
            </Grid>
        </>
    );
}
