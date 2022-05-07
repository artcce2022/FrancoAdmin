import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes'; 

// project imports
import NavigationScroll from './layout/NavigationScroll'; 
import {useState, Suspense} from 'react'
// import i18n from  '../src/utils/locales/i18n.js'; 
// import LocaleContext from './LocaleContext'; 
// import { IntlProvider } from 'react-intl'; 
// ==============================|| APP ||============================== //

const App = ({ t }) => {
    const customization = useSelector((state) => state.customization);
    // const [locale, setLocale] = useState(i18n.resolvedLanguage);

    
    // i18n.on('languageChanged', (lng) => setLocale(i18n.language));
    return (
        <StyledEngineProvider injectFirst>
            <Suspense fallback="Cargando Traducciones">
            {/* <IntlProvider> */}
            <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        {/* <LocaleContext.Provider value={{locale, setLocale}}> */}
                        <NavigationScroll>
                            <Routes />
                        </NavigationScroll>
                        {/* </LocaleContext.Provider> */}
                    </ThemeProvider>
            {/* </IntlProvider>            */}
            </Suspense>                  
            </StyledEngineProvider>    
        
    );
};

export default App;
