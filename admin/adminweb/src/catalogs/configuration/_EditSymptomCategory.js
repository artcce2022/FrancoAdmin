import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'

const useSymptomCategory = ({ idSymptomCategory }) => {
    const URI = 'http://localhost:3001/scategories/' + idSymptomCategory;
    const [sCategory, setSCategory] = useState([]);
   
    
  
    console.log(idSymptomCategory);
      //mostrar companies
      const getSymptomCategory = async () => {
        const res = await axios.get(URI );
        console.log(res.data);
        
        setSCategory(res.data);
      }
  
      useEffect(() => {
        getSymptomCategory()
      },[])
    return [sCategory, setSCategory];
  };
  
  
export default function EditSymptomCategory({idSymptomCategory, closeModal }) {
    const [sCategory] =useSymptomCategory({idSymptomCategory}); 
    const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
      mode: 'onBlur',
      defaultValues:{
        idSymptomCategory: "",
        category:""
      }
    }); 
  
    const fields = ['idSymptomCategory', 'category'];
    fields.forEach(field => setValue(field, sCategory[field])); 
      
    const onSubmit = async data => { console.log(data);
      if(idSymptomCategory>0){
        const URI = 'http://localhost:3001/scategories/' + idSymptomCategory;
        axios.put(URI, {
            idSymptomCategory: idSymptomCategory,
            category: data.category
        })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        }); 
      }else{
        const URI = 'http://localhost:3001/scategories/' ;
        axios.post(URI, {
            idSymptomCategory: idSymptomCategory,
            category: data.category 
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
                   <label>Categoria:</label>
                   <input className='form-control' type="text" name="category"  {...register('category', {required:"* Dato Requerido"})}  placeholder="Categoria"  />
                  <span className="badge badge-light"> {errors.category?.message}</span>
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
   