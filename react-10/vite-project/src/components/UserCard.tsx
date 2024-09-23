import Paper from '@mui/material/Paper';
import Grid  from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';

import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material';
// import { bgcolor, borderTopColor } from '@mui/system';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import {User} from "./types/user.type.ts"



const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body1"
                    },
                    style:{
                        fontSize: 11
                    }
                },
                {
                    props: {
                        variant: "body2"
                    },
                    style:{
                        fontSize: 9
                    }
                }

            ]
        }
    }
})


export default function UserCard(props:User){
    return(
        <Grid item xs={12} sm={6} md={4} >
            <ThemeProvider theme={theme}>
            <Paper elevation={3} square >
            <Grid container spacing={0}>
                <Grid item xs={4} >
                <img src={props.img}
                className='user-img'/>
            
            </Grid>
            <Grid item xs={8} >
                <Box paddingLeft={1}>
                <Grid container justifyContent="flex-end" paddingBottom={1}>
                    <Box sx={{bgcolor:"red"}}>
                    <Typography  variant="subtitle1" component="h5"
                    color="#FFFFFF">
                    {props.salary}
                    </Typography>
                    </Box>
                </Grid>
                <Typography  variant="subtitle2" component="h6">
                    <Link to={`/users/${props.userId}`} style={{textDecoration:"none"}}>
                        {props.name}
                        </Link>
                </Typography>
                <Box paddingTop={1}>
                <Typography  variant="body2" component="p">
                    Status:
                </Typography>
                </Box>
                <Box paddingY={1}>
                <Typography  variant="body1" component="p">
                    {props.status}
                </Typography>
                <Typography  variant="body1" component="p">
                    {props.location}
                </Typography>
                </Box>
                </Box>
                <Grid container sx={{borderTop:'1px solid #DDE5DD'}}
                padding={1}>
                    <Grid item xs={9}
                      sx={{borderRight:'1px solid #DDE5DD'}}>
                    <Typography  variant="subtitle1" component="h5">
                    <strong>REGISTER</strong>
                    </Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <Box sx={{paddingLeft:1.5}}>
                        <ShareIcon fontSize='medium' />
                        </Box>
                    </Grid>
                </Grid>
                
                
            </Grid>
            </Grid>
            </Paper>
            </ThemeProvider>
        </Grid>
    )
}