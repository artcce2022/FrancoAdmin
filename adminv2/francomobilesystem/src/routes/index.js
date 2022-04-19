import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes.js'
//   ../routes/MainRoutes.js'; 
import config from './../config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes], config.basename);
}
