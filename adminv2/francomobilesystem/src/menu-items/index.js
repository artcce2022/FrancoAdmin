import dashboard from './dashboard';
import configurationPages from './configurationMenu';
import administrationPages from './administrationMenu';
import utilities from './utilities';
import other from './other';
import warehousePages from './vendorsMenu';
import servicesPages from './servicesMenu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [servicesPages,  configurationPages, administrationPages, warehousePages]
};

export default menuItems;
