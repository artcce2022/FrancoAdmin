import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import Select from 'react-select';
import SelectSymptomCategory from '../../components/SelectList/_SymptomCategory';

const URI = 'http://localhost:3001/scategories/';
const URIFailures = 'http://localhost:3001/failures/' ;
const useSymptomsCategory =()=>{

  const [categoriesFailure, setcategoriesFailure] = useState([]);
    //mostrar companies
    const getCategoriesFailure = async () => {
      const res = await axios.get(URI );
      console.log(res.data);
      const listCategories= res.data.map((category) =>{
        return { value: category.idsymptomcategory, label: category.category };
      });
      setcategoriesFailure(listCategories);
    }

    useEffect(() => {
      getCategoriesFailure()
    },[])
  return [categoriesFailure, setcategoriesFailure];
};

const useCommonFailures = ({ idCommonFailure }) => {
  const URI = 'http://localhost:3001/failures/' + idCommonFailure;
  const [commonFailure, setCommonFailure] = useState([]); 

  console.log("test " + idCommonFailure);
    //mostrar companies
    const getCommonFailure = async () => {
      const res = await axios.get(URI );
      console.log(res.data);
      
      setCommonFailure(res.data);
    }

    useEffect(() => {
        getCommonFailure()
    },[])
  return [commonFailure, setCommonFailure];
};


export default function EditCommonFailure({idCommonFailure, closeModal, idsymptomcategorydefault }) {
//const [commonFailure] =useCommonFailures({idCommonFailure}); 
const [commonFailure, setCommonFailure] = useState([]); 
 // const [categoriesFailure] = useSymptomsCategory ();
 const[categoriesFailure, setcategoriesFailure]= useState([]); 
  const [idsymptomcategory, setIdsymptomcategory] = useState();  
  const {register,handleSubmit,setValue, reset,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
        idcommonfailures: "",
        shortdescription:"",
        symtomdescription:"",
        workrequested:"",
        hours:"",
        price:"",
        idsymptomcategory:""
    }
  }); 

  useEffect(()=>{
      axios(URI).then(({data}) => { 
      const listCategories= data.map((category) =>{
        if(category.idsymptomcategory===idsymptomcategorydefault){
          
           console.log({value:`${category.idsymptomcategory}` , label: category.category});
           setValue("idsymptomcategory", {value:`${category.idsymptomcategory}` , label: category.category});
          setIdsymptomcategory({value:`${category.idsymptomcategory}` , label: category.category});
        }
        return { value:`${category.idsymptomcategory}` , label: category.category };
      });
      setcategoriesFailure(listCategories);
      console.log(idsymptomcategory);
    })
  },[]) // empty array makes hook working once
   
  // Get Common Failures
  // useEffect(()=>{
  //   axios(URIFailures + idCommonFailure ).then(({data}) => {        
  //     setCommonFailure(data);
  //     setIdsymptomcategory(data.idsymptomcategory);
  //     console.log("after data");
  //     console.log(commonFailure);
  //      const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription','workrequested', 'hours', 'price','idsymptomcategory'];
  //     //  fields.forEach(field => {reset({field : data[field]})}); 
     
 
  // })},[]);
   
  useEffect(() => {
    axios.get(URIFailures + idCommonFailure).then((response) => {
      setCommonFailure(response.data);
     // setIdsymptomcategory(response.data.idsymptomcategory);
    const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription','workrequested', 'hours', 'price'];
    fields.forEach(field => {setValue(field, response.data[field]); });
    
    // console.log("find");
    // console.log(categoriesFailure.find(option => option.value ===`${response.data.idsymptomcategory}` ));      
    // setValue("idsymptomcategory", categoriesFailure.find(option => option.value ===`${response.data.idsymptomcategory}` ) );
    });
  }, []);


  // const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription','workrequested', 'hours', 'price','idsymptomcategory'];
  // fields.forEach(field => {setValue(field, commonFailure[field]); console.log("Entre a foreach")}); 
    
  const handleChange =(e) =>{   
     console.log("entr e y");
    this.setState({value: e.target.value}); 
   }

  const onSubmit = async (data, e) => { 
    e.preventDefault();
    console.log(data);
    if(idCommonFailure>0){
      const URI = 'http://localhost:3001/failures/' + idCommonFailure;
      axios.put(URI, {
        idcommonfailures: idCommonFailure,
        shortdescription: data.shortdescription,
        symtomdescription:data.symtomdescription ,
        workrequested:data.workrequested ,
        hours:data.hours ,
        price:data.price ,
        idsymptomcategory:parseInt(idsymptomcategory )
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/failures/' ;
      axios.post(URI, {
        idcommonfailures: idCommonFailure,
        shortdescription: data.shortdescription,
        symtomdescription:data.symtomdescription ,
        workrequested:data.workrequested ,
        hours:data.hours ,
        price:data.price ,
        idsymptomcategory:  parseInt(idsymptomcategory )
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
   <div>
      <form onSubmit={handleSubmit(onSubmit)}>
           <div className='card-body'>
               <div className="form-group">
                 <label>Descripcion Corta:</label>
                 <input className='form-control' type="text" defaultValue={commonFailure.shortdescription ?? "" } name="shortdescription"  {...register('shortdescription', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Descripcion Corta"  />
                <span className="badge badge-light"> {errors.shortdescription?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Descripcion:</label>
                 <textarea className='form-control'  type="textarea" defaultValue={commonFailure.symtomdescription ?? "" }   name="symtomdescription" {...register('symtomdescription', {required:"* Dato Requerido"})}   onChange={(e)=>handleChange}  placeholder="Agregar Descripcion" />
                 <span className="badge badge-light"> {errors.symtomdescription?.message}</span>
               </div>
               <div className="form-group">
                 <label>Trabajos Requeridos:</label>
                 <input className='form-control'  type="text" name="workrequested" defaultValue={commonFailure.workrequested ?? "" }   {...register('workrequested', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Agregar Trabajos Requeridos"  />
                 <span className="badge badge-light"> {errors.workrequested?.message}</span>
               </div>
               <div className="form-group">
                 <div className='row'> 
                  <div className='col col-lg-6'>
                    <label>Tiempo Aproximado:</label>
                    <input className='form-control'  type="text" name="hours" defaultValue={commonFailure.hours?? "" }  {...register('hours', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Tiempo Requerido"  />
                    <span className="badge badge-light"> {errors.hours?.message}</span>
                  </div>
                  <div className='col col-lg-6'>
                    <label>Precio:</label>
                    <input className='form-control'  type="text" name="price" defaultValue={commonFailure.price ?? "0" }    {...register('price', {required:"* Dato Requerido"})} onChange={(e)=>handleChange}   placeholder="Agregar Precio"  />
                    <span className="badge badge-light"> {errors.price?.message}</span>
                  </div>
                 </div>                
               </div> 
               <div className="form-group">
                 <label>Categoria:</label>
                 <Select name='idsymptomcategory'    getOptionLabel={(option) => option.label}  getOptionValue={(option) => option.value}    
                  onChange={(selectedOption) => {  setIdsymptomcategory(`${selectedOption.value}` ); console.log(selectedOption); }}   options={categoriesFailure} />
                 {/* <SelectSymptomCategory defaultValue={{value: '7', label: 'Engine Mechanical'}} idsymptomcategory={commonFailure.idsymptomcategory} setIdsymptomcategory={setIdsymptomcategory}  ></SelectSymptomCategory> */}
                 <span className="badge badge-light"> {errors.idsymptomcategory?.message}</span>
               </div>
               <div className="col-md-offset-2 col-md-10">
               <input type="submit"  defaultValue="Guardar" className="btn btn-primary float-left" />
                   <button  type="button" onClick={closeModal} className="btn btn-secondary float-right" >Cancel</button>
               </div>
             </div>
         </form>
   </div>
 )
}
 