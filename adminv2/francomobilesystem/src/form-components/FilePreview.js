import React, { useEffect, useState } from 'react'
import { Controller } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { Button, CardHeader, IconButton, Input, Dialog, AppBar, Toolbar, Typography } from '@mui/material';

export const FilePreviewFile = ({ name, control, selectedTile, setSelectedTile, handleClose }) => {
    return (
        <Controller
            name={name + "-controller"}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (

                <Dialog
                    fullScreen
                    open={selectedTile !== null}
                    onClose={handleClose}
                >
                    <AppBar>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* tile.path + tile.filename, tile.filename */}
                    <img src={selectedTile} alt={selectedTile} />
                </Dialog>
            )}
        />
    );
};