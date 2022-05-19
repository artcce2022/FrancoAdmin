import axios from 'axios'
import { useEffect, useState } from 'react'
import MyModal from '../../shared/Modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import EditFailureService from './_EditFailureService.js';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons';
import EditServiceDetail from './_EditServiceDetail';

const ServiceCommonDetailsList = ({ detailList, setDetailList, handleBack, handleNext, isLastStep, isFirstStep }) => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const [indexToDelete, setIndexToDelete] = useState(-1);

    const handleClose = () => {
        setOpenModalDetail(false);
    };

    const deleteDetail = (rowId, index) => {
        setIndexToDelete(rowId);
    };

    useEffect(() => {

        const dataDelete = [...detailList];
        const index = detailList.map(function (data) { return data.rowId; }).indexOf(indexToDelete);
        if (index < 0) return;
        dataDelete.splice(index, 1);
        setDetailList([...dataDelete]);

    }, [indexToDelete])



    return (
        <>
            <MainCard title={<CardHeader action={<Button variant="contained" onClick={() => { setOpenModalDetail(true); }} className='btn btn-primary'>Agregar</Button>} title="Detalles Reportados" />} >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                        <TableHead>
                            <TableRow>
                                <TableCell>{i18next.t('label.Description')}</TableCell>
                                <TableCell>{i18next.t('label.Actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {detailList.map((detail, index) => (
                                <TableRow
                                    key={detail.rowId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {detail.description}
                                    </TableCell>
                                    <TableCell>
                                        {/* <Button  variant="outlined"  onClick={() => { setDetail(detail.description); setOpenModalDetail(true); }} >Editar</Button> */}
                                        <Button variant="outlined" onClick={() => { deleteDetail(detail.rowId, index) }} >Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {openModalDetail && <MyModal id="id_myModal" title={"Agregar Detalle Reportado"} openModal={openModalDetail} closeModal={handleClose} >
                    <EditServiceDetail closeModal={handleClose} detailList={detailList} action={setDetail} />
                </MyModal>}
            </MainCard>
            <StepButtons handleBack={handleBack} handleNext={() => handleNext(detailList)} isFirstStep={isFirstStep} isLastStep={isLastStep}></StepButtons>
        </>
    )
}
export default ServiceCommonDetailsList