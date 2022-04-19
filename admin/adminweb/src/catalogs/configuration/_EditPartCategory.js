import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'

const usePartCategory = ({ idPartCategory }) => {
    const URI = 'http://localhost:3001/scategories/' + idPartCategory;
    const [pCategory, setPCategory] = useState([]);
   
    
  
    console.log(idPartCategory);
      //mostrar companies
      const getPartCategory = async () => {
        const res = await axios.get(URI );
        console.log(res.data);
        
        setPCategory(res.data);
      }
  
      useEffect(() => {
        getPartCategory()
      },[])
    return [pCategory, setPCategory];
  };
  
  
export default function EditPartCategory({idPartCategory, closeModal }) {
    const [sCategory] =usePartCategory({idPartCategory}); 
    const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
      mode: 'onBlur',
      defaultValues:{
        idPartCategory: "",
        category:""
      }
    }); 
  
    const fields = ['idPartCategory', 'category'];
    fields.forEach(field => setValue(field, sCategory[field])); 
      
    const onSubmit = async data => { console.log(data);
      if(idPartCategory>0){
        const URI = 'http://localhost:3001/scategories/' + idPartCategory;
        axios.put(URI, {
            idPartCategory: idPartCategory,
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
            idPartCategory: idPartCategory,
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
   