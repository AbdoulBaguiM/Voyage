import Head from 'next/head';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router'
import Router from 'next/router'
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
  TextField,
  Typography
} from '@mui/material';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import authHeader from 'src/services/auth-header';

const Account = () => {
  const router = useRouter()
  const { id } = router.query
  const [customer, setCustomer] = useState({
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    pays: '',
    avatar: '',
    roles: []
  });

  const fetchCustomer = () => {
    axios.get(`${process.env.API_BASE_URL}/comptes/${id}`, { headers: authHeader() }).then(res => {
    setCustomer(res.data);
    });
  };

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=> {
    fetchCustomer();
  }, []);

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

    console.log(authHeader().Authorization);
    const response = await fetch(`${process.env.API_BASE_URL}/comptes/` + id, {
      method:"PUT",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : authHeader().Authorization,
      },
      body : JSON.stringify(customer),
    });

    if(!response.ok) {
      throw new Error("Une erreur s'est produite");
    }

    Router.push('/admin/customers');
  };

  return (
  <>
    <Head>
      <title>
        Compte | Administration
      </title>
    </Head>
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
          Compte
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
                />
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
                onChange={handleChange}
                required
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
  </>
  );
};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
