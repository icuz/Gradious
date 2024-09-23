import UserCard from './UserCard.tsx';
import Container from '@mui/material/Container';
import Grid  from '@mui/material/Grid';
import profiles from "../data/profiles.json"

const UserList :React.FC = ()=>{
    return(
        <Container sx={{borderColor:'5px solid blue', marginTop:5}} >
        <Grid container spacing ={3}>
            {profiles.map(profile => 
          <UserCard {...profile}/>)}
        </Grid>
      </Container>
    )
}

export default UserList;