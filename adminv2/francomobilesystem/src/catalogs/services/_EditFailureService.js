import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormSimpleAutoCompleteText } from '../../form-components/FormAutoCompleteText.js';
import { v4 as uuidv4 } from 'uuid';

const URI = 'http://localhost:3001/scategories/';
const URIFailures = 'http://localhost:3001/failures/';

export default function EditFailureService({ action, closeModal, idsymptomcategorydefault }) {
    //const [commonFailure] =useCommonFailures({idCommonFailure}); 
    const [commonFailure, setCommonFailure] = useState([]);
    // const [categoriesFailure] = useSymptomsCategory ();
    const [categoriesFailure, setcategoriesFailure] = useState([]);
    const [idsymptomcategory, setIdsymptomcategory] = useState('');
    const [selectedFailureStr, setSelectedFailureStr] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);

    const [filterStr, setFilterStr] = useState('');
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            idcommonfailures: "",
            shortdescription: "",
            symtomdescription: "",
            workrequested: "",
            hours: "",
            price: "",
            idsymptom
                : ""
        }
    });


    useEffect(() => {
        const UriFailures = 'http://localhost:3001/failures/';
        axios(UriFailures).then(({ data }) => {
            const failuresList = data.map((failure) => {
                return { value: `${failure.idcommonfailures}`, label: failure.shortdescription };
            });
            setOptions(failuresList);

        })
    }, []); // empty array makes hook working once

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
    }, []); // empty array makes hook working once



    useEffect(() => {
        axios.get(URIFailures + selectedFailureStr).then((response) => {
            setCommonFailure(response.data);
            console.log(response.data);
            const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription', 'workrequested', 'hours', 'price'];
            fields.forEach(field => { setValue(field, response.data[field]); });
            setIdsymptomcategory(response.data["idsymptomcategory"]);
        });
    }, [selectedFailureStr]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let newData = data;
        newData.rowId = uuidv4();
        action(newData);
    };
    const onSubmitAndClose = async (data, e) => {
        e.preventDefault();
        let newData = data;
        newData.rowId = uuidv4();
        action(newData);
        closeModal();
    };
    return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormSimpleAutoCompleteText control={control} setSelected={setSelectedFailureStr} defaultValue={selectedFailureStr} name={"failure"} setFilter={(data) => { setFilterStr(data) }} setLoading={setLoading} label={"Falla"} options={options}  ></FormSimpleAutoCompleteText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={"Descripcion"} name={"symtomdescription"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText control={control} label={"Trabajos Requeridos"} name={"workrequested"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText control={control} label={"Tiempo Aproximado"} name={"hours"} ></FormInputText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={"Precio"} name={"price"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Categoria
                            </InputLabel>
                            {/* <Select name='idsymptomcategory' getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value} onChange={(selectedOption) => { setIdsymptomcategory(selectedOption.value); console.log(selectedOption); }} options={categoriesFailure} /> */}
                            <Select
                                style={{ width: "150px" }}
                                value={idsymptomcategory}
                                key="idsymptomcategory"
                                name='idsymptomcategory' getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value}
                                onChange={(selectedOption) => { setIdsymptomcategory(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); }}
                            >
                                {!!categoriesFailure?.length &&
                                    categoriesFailure.map(({ label, value }) => (
                                        <MenuItem key={`${label}-${value}`} value={value}>
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
                            <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                                Agregar
                            </Button>
                            <Button onClick={handleSubmit(onSubmitAndClose)} variant="contained" >
                                Agregar y Cerrar
                            </Button>
                            <Button variant="contained" color='secondary' onClick={closeModal} >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
