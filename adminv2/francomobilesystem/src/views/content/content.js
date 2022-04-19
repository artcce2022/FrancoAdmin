// material-ui
import { Typography } from '@mui/material';
import CompaniesList from '../../catalogs/configuration/Companies';

// project imports
import MainCard from './../../ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Sample Card">
       <CompaniesList></CompaniesList>
    </MainCard>
);

export default SamplePage;
