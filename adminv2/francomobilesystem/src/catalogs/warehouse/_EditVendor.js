import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Autocomplete, InputMask, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormAutoCompleteText } from '../../form-components/FormAutoCompleteText_V2.js';
import InputEmailField from '../../form-components/InputEmailField.js';


export default function EditVendor({ idVendor, closeModal }) {
    //const [warehouse] =useWarehouse({idWarehouse}); 
    const [vendor, setVendor] = useState([]);
    const URI = 'http://localhost:3001/vendors/';
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: "",
            contact: "",
            address: "",
            zipcode: "",
            phone: "",
            extension: "",
            fax: "",
            email: "",
            terms: "30",
            limits: "100",
            comments: ""
        }
    });


    useEffect(() => {
        axios.get(URI + idVendor).then((response) => {
            setVendor(response.data);
            console.log("data");

            console.log(response.data);
            const fields = ['name', 'contact', 'address', 'zipcode', 'phone', 'extension'
                , 'fax', 'email', 'terms', 'limits', 'comments'];
            fields.forEach(field => { setValue(field, response.data[field]); });
        })
    }, []) // empty array makes hook working once

    // const fields = ['warehousename', 'address',  'phone', 'manager'];
    // fields.forEach(field => setValue(field, warehouse[field])); 

    const onSubmit = async data => {
        console.log(data);
        if (idVendor > 0) {
            const URI = 'http://localhost:3001/vendors/' + idVendor;
            axios.put(URI, {
                idVendor: idVendor,
                name: data.name,
                contact: data.contact,
                address: data.address,
                phone: data.phone,
                zipcode: data.zipcode,
                extension: data.extension,
                fax: data.fax,
                email: data.email,
                terms: data.terms,
                limits: data.limits,
                comments: data.comments
            })
                .then(function (response) {
                    console.log(response);
                    closeModal();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            const URI = 'http://localhost:3001/vendors/';
            axios.post(URI, {
                idVendor: idVendor,
                name: data.name,
                contact: data.contact,
                address: data.address,
                phone: data.phone,
                zipcode: data.zipcode,
                extension: data.extension,
                fax: data.fax,
                email: data.email,
                terms: data.terms,
                limits: data.limits,
                comments: data.comments
            })
                .then(function (response) {
                    console.log(response);
                    closeModal();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };
    return (
        <Paper variant="elevation">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormInputText control={control} label={"Vendedor"} name={"name"} ></FormInputText>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText control={control} label={"Address"} name={"address"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"ZipCode"} name={"zipcode"} ></FormInputText>
                    </Grid>                    
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Contacto"} name={"contact"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Telefono"} name={"phone"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Extension"} name={"extension"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Fax"} name={"fax"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Email"} name={"email"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"terms"} name={"terms"} ></FormInputText>
                    </Grid>
                    <Grid item xs={6}>
                        <FormInputText control={control} label={"Limits"} name={"limits"} ></FormInputText>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText control={control} label={"Comentarios"} name={"comments"} ></FormInputText>
                    </Grid> 
                    <Grid item xs={12}>
                        <Divider variant="inset" />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
                            <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                                Guardar
                            </Button>
                            <Button variant="contained" color='secondary' onClick={closeModal} >
                                Cancel
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

            </form>
        </Paper>
    )
}
