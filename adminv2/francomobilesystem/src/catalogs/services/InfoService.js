import React, { useEffect, useState } from 'react'
import { Controller } from "react-hook-form";
import { Card, Button, CardHeader, IconButton, Input, Dialog, AppBar, Toolbar, Typography, Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Box, Icon, Divider } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';
import { IconSettings } from '@tabler/icons';
export const InfoService = ({ service, setOpenModal }) => {
    return (
        <Card>
            <CardHeader pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h2" fontWeight="medium">
                    DETALLE DE SERVICIO
                </Typography>
                <Box sx={{ m: 1 }}>
                <Button startIcon={<IconSettings fontSize="small" />} sx={{ mr: 1 }}>
                    Partes
                </Button>
        </Box>
            </CardHeader>
            <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}  >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow key="Alias" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row"><Typography variant="h4" component="div" gutterBottom>Customer</Typography>  </TableCell>
                                <TableCell align="left">{service.customer?.shortname}</TableCell>
                                <TableCell sx={{ typography: 'h4' }} align="left">{i18next.t('label.Company')}</TableCell>
                                <TableCell align="left">{service.vehicle?.vin}</TableCell>
                            </TableRow>
                            <TableRow key="Nombre" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell sx={{ typography: 'h4' }} scope="row">{i18next.t('label.Location')}</TableCell>
                                <TableCell align="left" colSpan={3}>{service.location?.locationName}</TableCell>
                            </TableRow>
                            <TableRow key="DAteCreation" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell sx={{ typography: 'h4' }} >{i18next.t('label.Date')}</TableCell>
                                <TableCell colSpan={3} align="left">{service.datecreate}</TableCell>
                            </TableRow>
                            <TableRow key="serviceId" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell sx={{ typography: 'h4' }} scope="row">{i18next.t('label.ZipCode')}</TableCell>
                                <TableCell align="left">{service.serviceid}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
            <Divider/>
        </Card>

    );
};