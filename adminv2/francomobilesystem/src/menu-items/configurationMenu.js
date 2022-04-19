// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const configurationPages = {
    id: 'configuration',
    title: 'Configuration',    
    type: 'group',
    children: [
          
                {
                    id: 'Companies',
                    title: 'Empresas',
                    type: 'item',
                    url: 'Companies' ,
                    target: false
                },
                {
                    id: 'employees',
                    title: 'Empleados',
                    type: 'item',
                    url: 'employees',
                    target: false
                },
                {
                    id: 'locations',
                    title: 'Patios',
                    type: 'item',
                    url: 'locations',
                    target: false
                },
                {
                    id: 'partscategory',
                    title: 'Categorias de Refacciones',
                    type: 'item',
                    url: 'partscategory',
                    target: false
                },
                {
                    id: 'simptomscategory',
                    title: 'Categorias de Fallas',
                    type: 'item',
                    url: 'simptomscategory',
                    target: false
                },
                {
                    id: 'warehouses',
                    title: 'Almacenes',
                    type: 'item',
                    url: 'warehouses',
                    target: false
                } 
            
           ] 
};

export default configurationPages;
