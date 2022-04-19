import React from "react";

const defaultValue = {
  locale: 'es',
  setLocale: () => {} 
}

export default React.createContext(defaultValue);