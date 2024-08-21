import React, { useEffect, useState } from "react";
import axios from "axios";
import Path from "./Path";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Stack } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddPhoto from "./AddPhoto";
import { useNavigate } from "react-router-dom";
import Cardss from "./Cardss";
import AddProducts from "./AddProducts";

const settings = ["Profile", "Delete account", "Logout"];

function MainPage() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(0); // Default cart to 0
  const name = localStorage.getItem("user");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("viewProducts"); // Default view
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${Path}entries/get-name`, { params: { user: name } })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleDelete = () => {
    axios
      .delete(`${Path}entries/delete-user`, { params: { user: name } })
      .then(() => {
        navigate("/");
        localStorage.removeItem("user");
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const handleLogout = () => {
    setOpenLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    navigate("/");
    localStorage.removeItem("user");
  };

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAddProductsClick = () => {
    setView("addProducts");
  };

  const handleViewProductsClick = () => {
    setView("viewProducts");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {/* Navbar */}
      <Box
        sx={{
          flexGrow: 1,
          position: "sticky",
          width: "100%",
          top: 0,
          bgcolor: "background.paper",
          boxShadow: 3,
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%', // Ensure it takes full width
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
          <IconButton onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: 'relative',
              justifyContent: 'flex-start',
              height: '60px',
            }}
          >
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleAddProductsClick}
              sx={{
                height: '100%',
                borderRadius: 0,
                position: 'relative',
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  bgcolor: 'primary.main',
                },
              }}
            >
              Add Products
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleViewProductsClick}
              sx={{
                height: '100%',
                borderRadius: 0,
                position: 'relative',
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  bgcolor: 'primary.main',
                },
              }}
            >
              View Products
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Drawer for settings */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{ "& .MuiDrawer-paper": { width: 250 } }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            <Box>
              {data ? (
                <Typography variant="h6">{data.user}</Typography>
              ) : (
                <Typography variant="body1">Loading...</Typography>
              )}
            </Box>
          </Stack>
          <List>
            {settings.map((setting) => (
              <ListItem
                button
                key={setting}
                onClick={() => {
                  if (setting === "Logout") {
                    handleLogout();
                  } else if (setting === "Delete account") {
                    handleOpenDeleteModal();
                  } else {
                    console.log(setting);
                  }
                }}
              >
                <ListItemText primary={setting} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {view === "addProducts" ? <AddProducts /> : <Cardss />}

      {/* Add margin to push the card below the navbar */}
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          marginTop: "64px",
        }}
      >
        {/* <Card sx={{ maxWidth: "40%", alignContent: "center" }}>
          <CardContent>
            <AddPhoto cart={cart} setCart={setCart} />
          </CardContent>
        </Card> */}
      </Stack>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutModal} onClose={handleCloseLogoutModal}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Delete Account</DialogTitle>
        <DialogContent>Are you sure you want to delete your account?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MainPage;
