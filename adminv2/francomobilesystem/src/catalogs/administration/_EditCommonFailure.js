import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios' 
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import i18next from 'i18next';

const URI = 'http://localhost:3001/scategories/';
const URIFailures = 'http://localhost:3001/failures/';

export default function EditCommonFailure({ idCommonFailure, closeModal, idsymptomcategorydefault }) {
    //const [commonFailure] =useCommonFailures({idCommonFailure}); 
    const [commonFailure, setCommonFailure] = useState([]);
    // const [categoriesFailure] = useSymptomsCategory ();
    const [categoriesFailure, setcategoriesFailure] = useState([]);
    const [idsymptomcategory, setIdsymptomcategory] = useState('');
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            idcommonfailures: "",
            shortdescription: "",
            symtomdescription: "",
            workrequested: "",
            hours: "",
            price: "",
            idsymptomcategory: ""
        }
    });

    

    useEffect(() => {
        axios(URI).then(({ data }) => {
          
            const listCategories = data.map((category) => {
                if (category.idsymptomcategory === idsymptomcategorydefault) {

                    //   setValue("idsymptomcategory", { value: `${category.idsymptomcategory}`, label: category.category });
                    setIdsymptomcategory({ value: `${category.idsymptomcategory}`, label: category.category });
                }
                return { value: `${category.idsymptomcategory}`, label: category.category };
            });
            setcategoriesFailure(listCategories); 
        })
    }, []) // empty array makes hook working once


    useEffect(() => {
        axios.get(URIFailures + idCommonFailure).then((response) => {
            setCommonFailure(response.data); 
            console.log(response.data);
            const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription', 'workrequested', 'hours', 'price'];
            fields.forEach(field => { setValue(field, response.data[field]); }); 
            setIdsymptomcategory(response.data["idsymptomcategory"]);
        });
    }, []); 
  
    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data);
        if (idCommonFailure > 0) {
            const URI = 'http://localhost:3001/failures/' + idCommonFailure;
            axios.put(URI, {
                idcommonfailures: idCommonFailure,
                shortdescription: data.shortdescription,
                symtomdescription: data.symtomdescription,
                workrequested: data.workrequested,
                hours: data.hours,
                price: data.price,
                idsymptomcategory: parseInt(idsymptomcategory)
            })
                .then(function (response) {
                    console.log(response);
                    closeModal();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            const URI = 'http://localhost:3001/failures/';
            axios.post(URI, {
                idcommonfailures: idCommonFailure,
                shortdescription: data.shortdescription,
                symtomdescription: data.symtomdescription,
                workrequested: data.workrequested,
                hours: data.hours,
                price: data.price,
                idsymptomcategory: parseInt(idsymptomcategory)
            })
                .then(function (response) {
                    console.log(response);
                    closeModal();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };  return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={i18next.t('label.shortDescription')} name={"shortdescription"} ></FormInputText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={i18next.t('label.Description')} name={"symtomdescription"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText control={control} label={i18next.t('label.RequiredWorks')} name={"workrequested"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText control={control} label={i18next.t('label.TimeAprox')} name={"hours"} ></FormInputText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={i18next.t('label.Price')} name={"price"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                {i18next.t('label.Categoria')}
                            </InputLabel>
                             {/* <Select name='idsymptomcategory' getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value} onChange={(selectedOption) => { setIdsymptomcategory(selectedOption.value); console.log(selectedOption); }} options={categoriesFailure} /> */}
                             <Select
                                    style={{ width: "150px" }}
                                    value={idsymptomcategory}
                                    name='idsymptomcategory'   getOptionLabel={(option) => option.label}  getOptionValue={(option) => option.value}    
                                    onChange={(selectedOption) => { setIdsymptomcategory(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); }}
                                    >
                                    {!!categoriesFailure?.length &&
                                    categoriesFailure.map(({ label, value }) => (
                                        <MenuItem key={value} value={value}>
                                        {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                         <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
                            <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                            {i18next.t('label.Save')}
                            </Button>
                            <Button variant="contained" color='secondary' onClick={closeModal} >
                            {i18next.t('label.Cancel')}
                            </Button>
                          </Stack>
                        </Grid>
                        
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}