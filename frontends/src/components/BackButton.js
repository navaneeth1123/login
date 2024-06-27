import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardHeader, Icon, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    
    const handleback=()=>{
        navigate('/')
    }
    
  return (
    <div>
       <IconButton onClick={handleback}>
            <ArrowBackIcon />
          </IconButton>
    </div>
  )
}
