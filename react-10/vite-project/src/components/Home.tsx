import '../App.css';

import { Box } from '@mui/material';
import UserAppBar from './UserAppBar';
import { Outlet } from 'react-router-dom';

export default function Home(){
    return(
      <Box sx={{flexGrow:1}}>
        <UserAppBar></UserAppBar>
        <Outlet/>
      </Box>
    )
}