// assets
import { IconKey } from '@tabler/icons';
import i18next from 'i18next';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const configurationPages = {
    id: 'configuration',
    title: `${i18next.t('label.config')}`,    
    type: 'group',
    children: [
          
                {
                    id: 'Companies',
                    title: `${i18next.t('label.companies')}`,
                    type: 'item',
                    url: 'Companies' ,
                    target: false
                },
                {
                    id: 'employees',
                    title: `${i18next.t('label.employees')}`,
                    type: 'item',
                    url: 'employees',
                    target: false
                },
                {
                    id: 'locations',
                    title: `${i18next.t('label.workyards')}`,
                    type: 'item',
                    url: 'locations',
                    target: false
                },
                {
                    id: 'partscategory',
                    title: `${i18next.t('label.CategorysParts')}`,
                    type: 'item',
                    url: 'partscategory',
                    target: false
                },
                {
                    id: 'simptomscategory',
                    title: `${i18next.t('label.CategorysFailure')}`,
                    type: 'item',
                    url: 'simptomscategory',
                    target: false
                },
                {
                    id: 'warehouses',
                    title: `${i18next.t('label.warehouses')}`,
                    type: 'item',
                    url: 'warehouses',
                    target: false
                } 
            
           ] 
};

export default configurationPages;
