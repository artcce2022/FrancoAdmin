import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormSimpleAutoCompleteText } from '../../form-components/FormAutoCompleteText.js';
import { v4 as uuidv4 } from 'uuid';
import { AlertNotification } from '../../form-components/NotifyAlert.js';
import i18next from 'i18next';

const URI = 'http://localhost:3001/scategories/';
const URIFailures = 'http://localhost:3001/failures/';

export default function EditServiceParts({ action, closeModal, idsymptomcategorydefault, failureList }) {
    const [selectedPartStr, setSelectedPartStr] = useState('');
    const [loading, setLoading] = useState(false);
    const [partsList, setPartsList] = useState([]);
    const [warehouseList, setWarehouseList] =useState([]);
    const [employeeList,setEmployeeList] =useState([]);
    const [idWarehouse, setIdWarehouse]  =useState(0);
    const [idEmployee, setIdEmployee] =useState(0);
    const [chargetoCustomer, setChargetoCustomer] =useState(0);
    const [idPart, setIdPart] =useState(0);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);    
    const [typeAlert, setTypeAlert] = useState("success");


    const [filterStr, setFilterStr] = useState('');
    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            idWarehouse: "",
            idEmployee: "",
            idPart: "",
            price: "0",
            serialnumber: "",
            quantity: "",
            chargetoCustomer: ""
        }
    });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    useEffect(() => {
        const uriParts = 'http://localhost:3001/parts/';
        axios(uriParts).then(({ data }) => {
            const partList = data.map((parts) => {
                return { value: `${parts.idparts}`, label: `${parts.partcode}-${parts.description}` };
            });
            setPartsList(partList);
        })
    }, []); // empty array makes hook working once

    useEffect(() => {
        const uriWarehouse = 'http://localhost:3001/warehouse/';
        axios(uriWarehouse).then(({ data }) => {
            const warehouseList = data.map((warehouse) => {
                return { value: `${warehouse.idwarehouse}`, label: `${warehouse.warehousename}` };
            });
            setWarehouseList(warehouseList);
        })
    }, []); // empty array makes hook working once

    useEffect(() => {
        const uriEmployees = 'http://localhost:3001/employees/';
        axios(uriEmployees).then(({ data }) => {
            const employeeslist = data.map((employee) => {
                return { value: `${employee.idemployee}`,label: `${employee.firstname} ${employee.lastname}` };
            });
            setEmployeeList(employeeslist);
        })
    }, []); // empty array makes hook working once

    // useEffect(() => {
    //     axios.get(URIFailures + selectedFailureStr).then((response) => {
    //         setCommonFailure(response.data);
    //         const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription', 'workrequested', 'hours', 'price'];
    //         fields.forEach(field => { setValue(field, response.data[field]); });
    //         setIdsymptomcategory(response.data["idsymptomcategory"]);
    //     });
    // }, [selectedFailureStr]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data);
        if (data.idcommonfailures > 0) {
            let newData = data;
            newData.rowId = uuidv4();
            failureList.push(newData);
            setSelectedPartStr("");
            reset();
            
            setAlertMessage(i18next.t('SuccessfulRecord'));
            setTypeAlert("success");
            setOpenAlert(true);
        }else{
            setAlertMessage(i18next.t('label.ErrorSelectValid')); 
            setTypeAlert("warning");
            setOpenAlert(true);
        }
        //action(newData);
    };
    return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            {i18next.t('label.Warehouse')}
                            </InputLabel>
                            {/* <Select name='idsymptomcategory' getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value} onChange={(selectedOption) => { setIdsymptomcategory(selectedOption.value); console.log(selectedOption); }} options={categoriesFailure} /> */}
                            <Select disabled
                                style={{ width: "150px" }}
                                value={idWarehouse}
                                key="idwarehouse"
                                name='idwarehouse' getOptionValue={(option) => option.value}
                                onChange={(selectedOption) => { setIdWarehouse(`${selectedOption.target.value}`); console.log("selectedoption"); console.log(`${selectedOption.target.value}`); }}
                            >
                                {!!warehouseList?.length &&
                                    warehouseList.map(({ label, value }) => (
                                        <MenuItem key={`${label}-${value}`} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            {i18next.t('label.technician')}
                            </InputLabel>
                            {/* <Select name='idsymptomcategory' getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value} onChange={(selectedOption) => { setIdsymptomcategory(selectedOption.value); console.log(selectedOption); }} options={categoriesFailure} /> */}
                            <Select disabled
                                style={{ width: "150px" }}
                                value={idEmployee}
                                key="idemployee"
                                name='idemployee' getOptionValue={(option) => option.value}
                                onChange={(selectedOption) => { setIdEmployee(`${selectedOption.target.value}`); console.log("selectedoption"); console.log(`${selectedOption.target.value}`); }}
                            >
                                {!!employeeList?.length &&
                                    employeeList.map(({ label, value }) => (
                                        <MenuItem key={`${label}-${value}`} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <FormSimpleAutoCompleteText isDisable={true} control={control} setSelected={setSelectedPartStr} defaultValue={selectedPartStr} name={"part"} setFilter={(data) => { setFilterStr(data) }} setLoading={setLoading} label={i18next.t('label.Part')} options={partsList}  ></FormSimpleAutoCompleteText>
                        </Grid>                        
                        <Grid item xs={12}>
                            <FormInputText isDisable={true} control={control} label={i18next.t('label.Price')} name={"price"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText isDisable={true} control={control} label={i18next.t('label.Serial')}  name={"serialnumber"} ></FormInputText>
                        </Grid>
                        <Grid item xs={6}>
                            <FormInputText isDisable={true} control={control} label={i18next.t('label.quantity')} name={"quantity"} ></FormInputText>
                        </Grid>
                       <Grid>
                            <FormControlLabel control={<Checkbox   checked={chargetoCustomer} onClick={(e) => setChargetoCustomer(e.target.checked)}  name="chargetoCustomer"  ></Checkbox>} label={i18next.t('label.ChargeToCustomer')}  />                       
                       </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                            <Stack spacing={2} direction="row">
                                <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                                {i18next.t('label.Add')}
                                </Button>
                                <Button variant="contained" color='secondary' onClick={closeModal} >
                                {i18next.t('label.Cancel')}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    {openAlert &&  <AlertNotification open={openAlert} handleClose={handleCloseAlert} type={typeAlert} message={alertMessage} />}
                </form>
            </Paper>
        </div>
    )
}
