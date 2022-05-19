import React from "react";
import { Controller } from "react-hook-form";
import { Snackbar, Alert } from '@mui/material';

export const AlertNotification = ({ open, handleClose, type, message }) => {
    console.log(type);
    console.log(message);
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled"  color={type==="success" ? "primary" :  "secondary"}    severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};