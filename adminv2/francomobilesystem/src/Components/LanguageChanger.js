import { useTranslation, Trans } from 'react-i18next';
import i18n from '../../src/utils/locales/i18n.js'
const lngs = {
  en: { nativeName: 'English' },
    es: { nativeName: 'Español' }
};


function ButtonsLanguage() {
  const { t, i18n } = useTranslation();
  const handleOnclick=(e)=>{
    e.preventDefault(); 
    i18n.changeLanguage(e.target.value);

  }
  
  return (
    <div className="button">
        <button value='es' onClick={handleOnclick}>
                Español
            </button>
            <button value='en' onClick={handleOnclick}>
                English
            </button>
    </div>
  );
}
export default ButtonsLanguage;