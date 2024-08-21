import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function PopupLogout({ open, onClose, onConfirm }) {

    

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("user");
      };
      const handleclose= ()=>{
        setHandleCloseLogoutModal(false)
      }
    
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        Are you sure you want to logout?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>Cancel</Button>
        <Button onClick={handleLogout} color="primary">Logout</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopupLogout;
