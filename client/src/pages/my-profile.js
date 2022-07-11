import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import Router from 'next/router';
import Head from 'next/head';
import React, {useState, useEffect} from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Container,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import { getInitials } from 'src/utils/get-initials';
import TokenService from 'src/services/token.service';
import api from 'src/services/api'

const MyProfile = () => {
    const [checked, setChecked] = useState(false);
    const [customer, setCustomer] = useState(TokenService.getUser());
    const [message, setMessage] = useState('');

    useEffect(() => {

      if(!customer)
        Router.push("/errors/notLoggedIn");
      else {
        setChecked(true)
      }
    }, [customer]);
    
    const handleChange = (event) => {
        setCustomer({
          ...customer,
          [event.target.name]: event.target.value
        });
    };

    const DivUploadButton = asUploadButton((props) => {
        useItemFinishListener((item) => {
          //Set profile pic
          customer.avatar = item.uploadResponse.data.fileName;  
        });
      
        return <Button
        color="primary"
        fullWidth
        variant="text"
        {...props}
      >
        Télécharger une image
      </Button>
    });

    const updateUser = async(e) => {
        e.preventDefault();

        let bodyForm = {
            id: customer.id,
            name: customer.name,
            lastName: customer.lastName,
            email: customer.email,
            telephone: customer.telephone,
            avatar: customer.avatar,
            pays: customer.pays,
            password: customer.password,
            roles: [ {
                id: 1,
                name: customer.roles[0]
            }]
        }

        api.put('/comptes/' + customer.id, {...bodyForm,})
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              throw new Error("Une erreur s'est produite");
            }
          });

        setMessage("Votre profil a été mis à jour avec succès");
        Router.push('/my-profile');
    };
    
    if (!checked) return null;

    return (
    <>
        <Head>
        <title>
            Mon Profil | {process.env.APP_NAME}
        </title>
        </Head>
        <br/><br/>
        <NavigationComponent/>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
        >
        <Container maxWidth="lg">
            <Typography
            sx={{ mb: 3 }}
            variant="h4"
            >
            Mon Compte
            </Typography>
            <Grid
            container
            spacing={3}
            >
            <Grid
                item
                lg={4}
                md={6}
                xs={12}
            >
            
            <Card>
                <CardContent>
                <Box
                    sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                    }}
                >
                    <Avatar
                    src={`${process.env.IMAGE_BASE_URL}`+customer.avatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                    >
                        { getInitials(customer.name+' '+customer.lastName) }
                    </Avatar>
                    <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    >
                    {customer.name}
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="body2"
                    >
                    {customer.lastName}
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="body2"
                    >
                    {customer.pays}
                    </Typography>
                </Box>
                </CardContent>
                <Divider />
                <CardActions>
                <Uploady
                    destination={{ url: `${process.env.API_BASE_URL}/upload` }}>
                    <DivUploadButton/>
                </Uploady>
                </CardActions>
            </Card>
            </Grid>
            <Grid
                item
                lg={8}
                md={6}
                xs={12}
            >
            <form
                autoComplete="off"
                noValidate
                {...customer}
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
                    value={customer.name}
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
                    value={customer.lastName}
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
                    type="email"
                    onChange={handleChange}
                    disabled
                    value={customer.email}
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
                    value={customer.telephone}
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
                    value={customer.pays}
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
                    variant="outlined"
                    required/>
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
            <Button
                color="primary"
                variant="contained"
                onClick={updateUser}
            >
                Mettre à Jour
            </Button>
            </Box>
        </Card>
        </form>
            </Grid>
            </Grid>
        </Container>
        </Box>
        {message && (
                  <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  message={message}
                />
                )
      }
    </>
    );
};      

MyProfile.getLayout = (page) => (
    <HomeLayout>
      {page}
    </HomeLayout>
);

export default MyProfile;

