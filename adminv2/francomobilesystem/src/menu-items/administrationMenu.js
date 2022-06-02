// assets
import { IconKey } from '@tabler/icons';
import i18next from 'i18next';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const administrationPages = {
    id: 'administration',
    title: `${i18next.t('label.administration')}`,    
    type: 'group',
    children: [
          
                {
                    id: 'Customers',
                    title: `${i18next.t('label.customers')}`,
                    type: 'item',
                    url: 'customers' ,
                    target: false
                }, 
                {
                    id: 'CommonFailures',
                    title: `${i18next.t('label.faultCommons')}`,
                    type: 'item',
                    url: 'CommonFailures' ,
                    target: false
                }
            
           ] 
};

export default administrationPages;
