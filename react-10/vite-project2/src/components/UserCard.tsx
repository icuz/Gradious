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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: '#e6e6e6' }}>
      <Card sx={{ width: 300, borderRadius: '20px', boxShadow: 3 }}>
        <CardMedia
          component="img"
          image="https://imgs.search.brave.com/FlZqWF7uihR5fnp_ZR_1PF72SuaxpsT2r9psa7rCuV4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9teW5l/d21pY3JvcGhvbmUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L21ubV9I/b3dfVG9fSG9sZF9B/X01pY3JvcGhvbmVf/V2hlbl9QdWJsaWNf/U3BlYWtpbmdfQW5k/X1ByZXNlbnRpbmdf/bGFyZ2UuanBn"
          alt="Profile"
          sx={{ width: 150, height: 150, borderRadius: '50%', margin: '20px auto' }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom><strong>Film Director, Producer</strong></Typography>
          <Typography variant="body2" color="textSecondary" id="earning">€14/hour</Typography>
          <Box sx={{ backgroundColor: '#f4f4f4', borderRadius: '20px', padding: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Jeffrey Abrams, 51</Typography>
            <Typography variant="body2" color="textSecondary">New York, United States</Typography>
            <Typography variant="body2" sx={{ margin: '10px 0' }}>
              Jeffrey Abrams is an American film director, producer, and screenwriter. He is known for his work in the genres of action, drama, and science fiction.
            </Typography>
            <Button variant="outlined" sx={{ width: '80%', marginTop: '10px' }} id="cv">VIEW CV</Button>
            <Button variant="contained" sx={{ width: '80%', marginTop: '10px' }} id="offer">MAKE OFFER</Button>
            <Typography variant="body2" color="green" sx={{ marginTop: '10px' }}>🟢Online</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    )
}