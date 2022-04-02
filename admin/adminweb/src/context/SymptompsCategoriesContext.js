import { createContext,useState } from "react";
const SymptomCategoriesContext = createContext();

const SymptomCategoriesContextProvider=(props) =>{
    return (
        <SymptomCategoriesContext.Provider>
            {props.children}
        </SymptomCategoriesContext.Provider>
    )
}

export default SymptomCategoriesContextProvider;