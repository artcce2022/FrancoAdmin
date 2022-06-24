import axios from 'axios'
import { useEffect, useState } from 'react'
import MyModal from '../../shared/Modal';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from '../../utils/locales/i18n.js'
import { IconDownload, IconEraser, IconZoomIn } from '@tabler/icons';
import { FilePreviewFile } from '../../form-components/FilePreview';
import { useForm } from 'react-hook-form';
import ImageIcon from '@mui/icons-material/Image';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, CardHeader, Button, Divider } from '@mui/material';
import { FileCopy, PictureAsPdf } from '@material-ui/icons';
import { FileAvatar } from '../../form-components/FormAvatarFile';


const ServiceFilesList = ({ idService, setOpenModal, serviceGuid,refreshFiles, setRefreshFiles }) => {
    const [serviceFiles, setServiceFiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(null);
    const { control } = useForm();
    const [confirmOpen, setConfirmOpen] = useState(null);
    const URI = 'http://localhost:3001/services/files/'
    const URIFiles = 'http://localhost:3001/services/getfile'
    useEffect(() => {
        getServiceFiles();
    }, []);

    useEffect(()=>{
       if(refreshFiles===true){
        getServiceFiles();
        setRefreshFiles(false);
       } 
    },[refreshFiles])
    const getServiceFiles = () => {
        console.log(URI + idService);
        axios.get(URI + idService).then((response) => {
            let details = response.data;
            console.log(details);
            setServiceFiles(details);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }

    const handleDownload = (url, filename) => {
        const config = { responseType: 'blob', path: url };
        // axios.post(URIFiles, config).then(response => {
        //     new File(response, filename);       
        // });

        axios({
            url: URIFiles,
            method: 'POST',
            data: config,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        });
    }

    const handleDeleteFile = (url, filename, idservicefile) => {
        // axios.post(URIFiles, config).then(response => {
        //     new File(response, filename);       
        // });
        const URIDelete = 'http://localhost:3001/services/file/' + idservicefile;
        axios.delete(URIDelete, {
            url: url,
            filename: filename,
            idservicefile: idservicefile
        })
            .then(function (response) {
                console.log(response);
                getServiceFiles();
                setRefreshFiles(false);   
            })
            .catch(function (error) {
                console.log(error);
            });  
    }

    const handleClickOpen = tile => {
        console.log("clicked");
        console.log(tile);
        setSelectedTile(tile);
    };

    const handleClose = () => {
        setSelectedTile(null);
    };



    return (
        <>
            <MainCard sx={{ minHeight: 500, maxHeight: 500 , overflow: 'auto' }} title={<CardHeader action={<Button variant="contained" onClick={() => { setOpenModal(true); }} className='btn btn-primary'>Agregar</Button>} title={i18next.t('label.Files')} />} >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , overflow: 'auto'}}>
                    {serviceFiles.map((file, index) => (
                        <>
                            <ListItem key={file.idservicefile}>
                                <ListItemAvatar> {(() => {
                                    switch (file.filetype) {
                                        case "image/png":
                                            return <Avatar alt={file.description} src={"http://127.0.0.1:8080/" + file.path + file.filename} />
                                        case "application/pdf":
                                            return <Avatar> </Avatar>
                                        default:
                                            return <Avatar></Avatar>
                                    }
                                })()}
                                </ListItemAvatar>
                                <ListItemText primary={file.filename} secondary={file.description} />
                                <IconButton color="primary" onClick={() => { handleDownload(file.path + file.filename, file.filename) }} aria-label="upload picture" component="span">
                                    <IconDownload />
                                </IconButton>
                                <IconButton color="primary" onClick={() => { setConfirmOpen(true) }} aria-label="upload picture" component="span">
                                    <IconEraser />
                                </IconButton>
                            </ListItem>
                            <Divider />
                            {confirmOpen && <MyModal id="id_myModal" title={i18next.t('label.ConfirmDelete')} openModal={confirmOpen} isConfirm={true} closeModal={setConfirmOpen} onConfirm={() => { handleDeleteFile(file.path + file.filename, file.filename, file.idservicefile); setConfirmOpen(false); }}></MyModal>}
                        </>
                    ))}
                </List>
                {/* 
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                        <TableHead>
                            <TableRow>
                                <TableCell>{i18next.t('label.Name')}</TableCell>
                                <TableCell>{i18next.t('label.Description')}</TableCell>
                                <TableCell>{i18next.t('label.Actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {serviceFiles.map((file, index) => (
                                <TableRow
                                    key={file.idservicefile}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {file.filename}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {file.description}
                                    </TableCell>
                                    <TableCell>
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" onClick={() => { handleDownload(file.path + file.filename, file.filename) }} aria-label="upload picture" component="span">
                                                <IconDownload />
                                            </IconButton> 
                                             <IconButton color="primary" onClick={() =>{ handleClickOpen(file)}} aria-label="upload picture" component="span">
                                                <IconZoomIn />
                                            </IconButton> }
                                        </label>
                                        <Button variant="outlined" onClick={() => { deleteDetail(detail.rowId, index) }} >Eliminar</Button> 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                {/* {selectedTile && <FilePreviewFile name="preview" control={control}  selectedTile={selectedTile} setSelectedTile={setSelectedTile} handleClose={handleClose} />} */}

            </MainCard>
        </>
    )
}
export default ServiceFilesList