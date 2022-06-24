// assets
import { IconKey } from '@tabler/icons';
import i18next from 'i18next';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const warehousePages = {
    id: 'warehouse',
    title: `${i18next.t(`label.warehouses`)}`,    
    type: 'group',
    children: [
          
                {
                    id: 'vendors',
                    title: `${i18next.t(`label.vendors`)}`,
                    type: 'item',
                    url: 'vendors' ,
                    target: false
                }
           ] 
};

export default warehousePages;
