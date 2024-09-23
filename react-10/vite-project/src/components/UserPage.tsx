// import { StayPrimaryLandscape } from "@mui/icons-material";
import { Box, Container, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./UserAppBar.tsx";
import profiles from "../data/profiles.json"
import { useParams } from "react-router-dom";


export default function UserPage(){
    const params = useParams();
    const userId = params.userId?parseInt(params.userId):1001;
    const profile = profiles.find(profile=> profile.userId==userId)
    return(
        <Container sx={{width:900}}>
            <Box marginTop={3} 
            sx={{ display: 'block'}}>
               <img
               style={{display: "block", width:"100%", height:"100%"
            }}
               src={profile?.detailImage}/>
            </Box>
            <ThemeProvider theme={theme}>
            <Box height={30} marginTop={2} 
            paddingLeft={1}
            bgcolor="primary.dark">
            <Typography  variant="h6" component="h6"
                    color="#FFFFFF" >
                    {profile?.name}
                    </Typography>   
            </Box>
            <Box paddingLeft={1}>
                <Typography variant="body2" component="p">
                {profile?.status}
                </Typography>
            </Box>
            </ThemeProvider>
        </Container>
    )
}