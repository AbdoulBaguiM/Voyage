import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormGroup,
  FormControl,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import Router from 'next/router'
import TokenService from 'src/services/token.service';
import api from 'src/services/api'


export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    pays: '',
    roles: []
  });
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const saveUser = async (e) => {
    e.preventDefault();
    
    //Profile picture
    values.avatar=props.avatar;

    api.post('/auth/signup',{...values})
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      }
    });
    
    Router.push('/admin/customers')
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Les informations peuvent être modifiées"
          title="Profil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nom"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prénom"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Adresse Mail"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Numéro de Téléphone"
                name="telephone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pays"
                name="pays"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                type="password"
                onChange={handleChange}
                variant="outlined"/>
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          { props.new ? 
           <Button
           color="primary"
           variant="contained"
           onClick={saveUser}
         >
           Enregistrer
         </Button>
           :
          <Button
           color="primary"
           variant="contained"
         >
           Mettre à Jour
         </Button>
            }
          
        </Box>
      </Card>
    </form>
  );
};
