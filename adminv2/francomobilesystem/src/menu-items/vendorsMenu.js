// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const warehousePages = {
    id: 'warehouse',
    title: 'Warehouse',    
    type: 'group',
    children: [
          
                {
                    id: 'vendors',
                    title: 'Vendors',
                    type: 'item',
                    url: 'vendors' ,
                    target: false
                }
           ] 
};

export default warehousePages;
