// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const administrationPages = {
    id: 'administration',
    title: 'Administration',    
    type: 'group',
    children: [
          
                {
                    id: 'Customers',
                    title: 'Clientes',
                    type: 'item',
                    url: 'customers' ,
                    target: false
                }, 
                {
                    id: 'CommonFailures',
                    title: 'Fallas Comunes',
                    type: 'item',
                    url: 'CommonFailures' ,
                    target: false
                }
            
           ] 
};

export default administrationPages;
