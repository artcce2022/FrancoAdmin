import dashboard from './dashboard';
import configurationPages from './configurationMenu';
import administrationPages from './administrationMenu';
import utilities from './utilities';
import other from './other';
import warehousePages from './vendorsMenu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [ configurationPages, administrationPages, warehousePages]
};

export default menuItems;
