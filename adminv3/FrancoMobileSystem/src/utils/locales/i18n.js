import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_ES } from './es/menu.js';
import { TRANSLATIONS_EN } from "./en/menu.js"; 
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
 
i18n  
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    fallbackLng: "es", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      es: {
        translation: TRANSLATIONS_ES
      }
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

//   // catch the event and make changes accordingly
  i18n.on('languageChanged', (lng) => {
 console.log("cambie laguage " + lng);
 
 localStorage.setItem('locale',lng)
  // then re-render your app
  //app.render();
}); 
 i18n.changeLanguage('es');
  export default i18n;
  