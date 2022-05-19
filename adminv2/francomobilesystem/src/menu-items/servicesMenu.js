// assets
import { IconKey } from '@tabler/icons';

//import i18next from '../../src/utils/locales/i18n.js' 
import i18n from 'i18next';
import { v4 as uuidv4 } from 'uuid';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
 

const servicesPages = {
    id: 'services',
    title: 'services',    
    type: 'group',
    children: [
          
                {
                    id:'NewService' ,
                    title:`${i18n.t(`menu.NewService`)}`,
                    type: 'item',
                    url: 'NewService/?id=' + uuidv4() ,
                    target: false
                }
           ] 
};

export default servicesPages;
