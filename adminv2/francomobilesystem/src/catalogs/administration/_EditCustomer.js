import { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Autocomplete, InputMask, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormAutoCompleteText } from '../../form-components/FormAutoCompleteText_V2.js';
import InputEmailField from '../../form-components/InputEmailField.js';
import i18next from 'i18next';

const URI = 'http://localhost:3001/customers/';
const URIZipCodesFilter = 'http://localhost:3001/zipcodessearch/'

export default function EditCustomer({ idCustomer, closeModal, idsymptomcategorydefault }) {
  //const [commonFailure] =useCommonFailures({idCommonFailure}); 
  const [customer, setCustomer] = useState([]);
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterStr, setFilterStr] = useState('');
  const [email, setEmail] = useState('');
  const [selectedZipCode, setSelectedZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  // const [categoriesFailure] = useSymptomsCategory ();   
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      shortname: "",
      company: "",
      firstname: "",
      lastname: "",
      address: "",
      zipcode: "",
      city: "",
      state: "",
      phone: "",
      mobilephone: "",
      email: ""
    }
  });

  useEffect(() => {
    if(idCustomer>0){
      axios.get(URI + idCustomer).then((response) => {
        setCustomer(response.data);
        // setIdsymptomcategory(response.data.idsymptomcategory);
        const fields = ['shortname', 'company', 'firstname', 'lastname', 'address', 'zipcode', 'city', 'state', 'phone', 'mobilephone', 'email'];
        fields.forEach(field => { setValue(field, response.data[field]); });
     
        const zipsList =[];
        zipsList.push({value: `${response.data['zipcode']}`, name: response.data['zipcode']});
        setOptions(zipsList);
        console.log(zipsList);
        console.log(response.data['zipcode']);
         setSelectedZipCode(`${response.data['zipcode']}`);
      });
    } else{
      setOptions([]);
      setSelectedZipCode('');
    }  
  }, []);

  useEffect(() => {
    let active = true;

    console.log("loading   " + loading);
    if (!loading) {
      return undefined;
    }

    (async () => {
      axios(URIZipCodesFilter + filterStr).then(({ data }) => {
        var zips = data.rows;
        if (active) {
          const zipsList = zips.map((key) => {
            return { value: `${key.zip}`, name: key.zip };
          });
          setOptions(zipsList);
        }
      });
    })();
    return () => {
      active = false;
    };
  }, [loading]);



  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (filterStr.length > 1) {
      setOpen(true);
      setLoading(true);
    }
  }, [filterStr])

 


  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    if (idCustomer > 0) {
      const URI = 'http://localhost:3001/customers/' + idCustomer;
      axios.put(URI, {
        idCustomer: idCustomer,
        shortname: data.shortname,
        company: data.company,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zipcode:selectedZipCode,
        city: data.city,
        state: data.state,
        phone: data.phone,
        mobilephone: data.mobilephone,
        email: data.email
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/customers/';
      axios.post(URI, {
        shortname: data.shortname,
        company: data.company,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zipcode: selectedZipCode,
        city: data.city,
        state: data.state,
        phone: data.phone,
        mobilephone: data.mobilephone,
        email: data.email
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
            <FormInputText control={control} label={i18next.t('label.NomEmpresa')} name={"shortname"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputText control={control} label={i18next.t('label.Company')} name={"company"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Name')} name={"firstname"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Lastname')} name={"lastname"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputText control={control} label={i18next.t('label.Address')} name={"address"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            {/* <FormInputText control={control} label={"zipcode"} name={"zipcode"} ></FormInputText> */}
            <FormAutoCompleteText control={control} setSelected={setSelectedZipCode} defaultValue={selectedZipCode} label={i18next.t('label.Zipcode')} name={"zipcode"} setFilter={(data) => { setFilterStr(data) }} setLoading={setLoading} loading={loading} open={open} setOpen={setOpen} options={options}  ></FormAutoCompleteText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.City')} name={"city"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.State')} name={"state"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Phone')} name={"phone"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Mobile')} name={"mobilephone"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            {/* <FormInputText control={control} label={"Email"} name={"email"} > </FormInputText> */}
            <InputEmailField name={"email1"}  control={control} helperText="(Required)" value={"aaa.aaaa.com"} label={i18next.t("label.Email")} fieldName="email1" handleChange={(value, isValid) =>{setEmail(value)}}></InputEmailField>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={12}>
            <Divider variant="inset" />
          </Grid>
          <Grid item xs={12}>
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

  )
}