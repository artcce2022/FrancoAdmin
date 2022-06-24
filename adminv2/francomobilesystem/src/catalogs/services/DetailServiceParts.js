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


const ServicePartsList = ({ idService, setOpenModal, serviceGuid,refreshParts, setRefreshParts }) => {
    const [serviceParts, setServiceParts] = useState([]);
    const [selectedTile, setSelectedTile] = useState(null);
    const { control } = useForm();
    const [confirmOpen, setConfirmOpen] = useState(null);
    const URI = 'http://localhost:3001/services/parts/'
    useEffect(() => {
        getServiceParts();
    }, []);

    useEffect(()=>{
       if(refreshParts===true){
        getServiceParts();
        setRefreshParts(false);
       } 
    },[refreshParts])
    const getServiceParts = () => {
        console.log(URI + idService);
        axios.get(URI + idService).then((response) => {
            let parts = response.data;
            console.log(parts);
            setServiceParts(parts);
            // setIdsymptomcategory(response.data.idsymptomcategory);
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
                getServiceParts();
                setRefreshParts(false);   
            })
            .catch(function (error) {
                console.log(error);
            });  
    }

    return (
        <>
            <MainCard sx={{ minHeight: 500, maxHeight: 500 , overflow: 'auto' }} title={<CardHeader action={<Button variant="contained" onClick={() => { setOpenModal(true); }} className='btn btn-primary'>Agregar</Button>} title={i18next.t('label.Files')} />} >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , overflow: 'auto'}}>
                    {serviceParts.map((part, index) => (
                        <>
                            <ListItem key={part.idserviceparts}>
                                 <ListItemText primary={part.parts.partcode} secondary={part.parts.description} />                               
                                <ListItemText primary={part.quantity} />
                                <IconButton color="primary" onClick={() => { setConfirmOpen(true) }} aria-label="upload picture" component="span">
                                    <IconEraser />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>             
            </MainCard>
        </>
    )
}
export default ServicePartsList