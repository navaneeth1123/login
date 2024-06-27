import React, { useEffect, useState } from "react";
import axios from "axios";
import Path from "./Path";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function MainPage() {
  const [data, setData] = useState(null);
  const name = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const user = name;
    axios
      .get(`${Path}entries/get-name`, { params: { user } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleDelete = () => {
    const user = name;
    axios
      .delete(`${Path}entries/delete-user`, { params: { user } })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: "40%", alignContent: "center", position: "absolute" }}>
        <CardContent>
          {data ? (
            <Typography gutterBottom>
              Username: {data.user}
              <br />
              Password: {data.password}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              Loading...
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <IconButton
            variant="contained"
            onClick={handleDelete}
            sx={{ marginRight: 1 }}
          >
           <DeleteOutlineIcon/>
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
