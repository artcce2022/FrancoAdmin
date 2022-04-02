import { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';

const URI = 'http://localhost:3001/scategories/';


export default function SelectSymptomCategory({ idsymptomcategory, setIdsymptomcategory }) {
    // const [categoriesFailure] = useSymptomsCategory ();
    const [categoriesFailure, setcategoriesFailure] = useState(null); 

    useEffect(() => {
        axios(URI).then(({ data }) => {
            const listCategories = data.map((category) => {
                return { value: `${category.idsymptomcategory}`, label: category.category };
            });
            setcategoriesFailure(listCategories);
        })
    }, []) // empty array makes hook working once

    const handleSelectCategoryChange = (e) => {
        console.log("entr e y");
        this.setState({ value: e.target.value });
    }

    return (
        <div>
            <Select name='idsymptomcategory' value={idsymptomcategory} onChange={(selectedOption) => {  setIdsymptomcategory(selectedOption.value );}} options={categoriesFailure} />
        </div>
    )
}
