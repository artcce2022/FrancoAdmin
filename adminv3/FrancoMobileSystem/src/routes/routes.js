import ReactDOM from 'react-dom'
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { v4 as uuidv4 } from 'uuid';
export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Services', // `${i18next.t('label.CommonFailures')}`,
      icon: 'file-alt',
      to: '/Services/Services',
      active: true
    },
    {
      name: 'NewService', // `${i18next.t('label.CommonFailures')}`,
      icon:'flag',
      to: '/Services/NewService/?id=' + uuidv4(),
      active: true
    }
  ]
};

export const administrationRoutes = {
  label: 'Módulo Administration', //`${i18next.t('label.Administration')}`,
  labelDisable: false,
  children: [
    {
      name: 'Administration', // `${i18next.t('label.Administration')}`,
      active: true,
      icon: 'layer-group',
      children: [
        {
          name: 'Customers', // `${i18next.t('label.Customer')}`,
          to: '/Administration/Customers',
          active: true
        },
        {
          name: 'CommonFailures', // `${i18next.t('label.CommnonFailure')}`,
          to: '/Administration/CommonFailures',
          active: true
        }
      ]
    }
  ]
};

export const configurationRoutes = {
  label: 'Moldulo de Configuración', // `${i18next.t('label.Configuration')}`,
  labelDisable: false,
  children: [
    {
      name: 'Configuration', // `${i18next.t('label.Configuration')}`,
      active: true,
      icon: 'gear',
      children: [
        {
          name: 'Warehouse', //  `${i18next.t('label.Warehouse')}`,
          to: '/Configuration/warehouses',
          active: true
        },
        {
          name: 'Categories', //  `${i18next.t('label.SymptomsCategories')}`,
          to: '/Configuration/SymptomsCategories',
          active: true
        },
        {
          name: 'Parts Categories', //  `${i18next.t('label.PartsCategories')}`,
          to: '/Configuration/PartsCategories',
          active: true
        },
        {
          name: 'Locations', //  `${i18next.t('label.Locations')}`,
          to: '/Configuration/Locations',
          active: true
        },
        {
          name: 'Thecnicians', //  `${i18next.t('label.Employees')}`,
          to: '/Configuration/Employees',
          active: true
        },
        {
          name: 'Companies', //  `${i18next.t('label.Companies')}`,
          to: '/Configuration/Companies',
          active: true
        },
        {
          name: 'Vendors', //  `${i18next.t('label.Vendors')}`,
          to: '/Configuration/Vendors',
          active: true
        },
        {
          name: 'Failures', // `${i18next.t('label.CommonFailures')}`,
          to: '/Administration/CommonFailures',
          active: true
        }
      ]
    }
  ]
};
export const warehouseRoutes = {
  label: 'Módulo de Almacenes', //`${i18next.t('label.Administration')}`,
  labelDisable: false,
  children: [
    {
      name: 'Warehouse', // `${i18next.t('label.Administration')}`,
      active: true,
      icon: 'tools',
      children: [
        {
          name: 'Refacciones', // `${i18next.t('label.Customer')}`,
          to: '/Warehouse/Parts',
          active: true
        }
      ]
    }
  ]
};
export default [
  dashboardRoutes,
  administrationRoutes,
  configurationRoutes,
  warehouseRoutes
];