import React,{   useState, Suspense} from 'react' 
import Content from './components/Content.js'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import Navigation from './components/Navigation.js'  
import i18n from './i18n.js';
import LocaleContext from './LocaleContext.js'
import Loading from './components/Loading.js'
//Catalogos
 

export default function App() {

  const [locale, setLocale] = useState(i18n.language);

 
 
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  function changeLocale (l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  return (
    <div className='wrapper'>
       <LocaleContext.Provider i18n={i18n} value={{locale, setLocale} }>
       <Suspense fallback={<Loading />}>
      <Header></Header>
      <Navigation />
      <Content>  
       </Content> 
      <Footer> </Footer>
      </Suspense>
      </LocaleContext.Provider>
    </div>
  )
}
