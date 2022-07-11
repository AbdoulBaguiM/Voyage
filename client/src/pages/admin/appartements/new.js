import Head from 'next/head';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import React, {useEffect, useState} from "react";
import Router from 'next/router'
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import api from 'src/services/api'

const Appartement = () => {
  
  const [appartement, setAppartement] = useState({
    surface: '',
    description: '',
    contact: '',
    email: '',
    photo: '',
    ville: {
        id: ''
    },
    nombreChambre: '',
    ascenseur: '',
    agentSecurite: ''
  });

  const handleChange = (event) => {
    setAppartement({
      ...appartement,
      [event.target.name]: event.target.value
    });
  };

  const DivUploadButton = asUploadButton((props) => {
    useItemFinishListener((item) => {
      appartement.photo = item.uploadResponse.data.fileName;  
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
  
  const saveAppartement = async (e) => {
    e.preventDefault();

    let bodyForm = {
      surface: appartement.surface,
      description: appartement.description,
      email: appartement.email,
      contact: appartement.contact,
      photo: appartement.photo,
      ville: {
        id: appartement.ville
      },
      nombreChambre: appartement.nombreChambre,
      ascenseur: appartement.ascenseur == 1 ? true : false,
      agentSecurite: appartement.agentSecurite == 1 ? true : false
    };

    await api.post('/appartements',{...bodyForm})
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  throw new Error("Une erreur s'est produite");
                }
              });

    Router.push('/admin/appartements')
  };

  
  const [states, setStates] = useState([]);

  const fetchStates = () => {
    api.get('/villes').then(res => {
        setStates(res.data);
    });
  };

  useEffect(()=> {
    fetchStates();
  }, []);


  return (
  <>
    <Head>
      <title>
        Appartements | Administration
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
          Appartement
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
          <Card {...appartement}>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                  src={`${process.env.IMAGE_BASE_URL}`+appartement.photo}
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
                  
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {appartement.nombreChambre}
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
            {...appartement}
          >
          <Card>
            <CardHeader
              subheader="Les informations peuvent être modifiées"
              title="Appartement"
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
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    required
                    value={appartement.description}
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
                    label="Téléphone"
                    name="contact"
                    type="number"
                    onChange={handleChange}
                    required
                    value={appartement.contact}
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
                    value={appartement.email}
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
                    label="Surface"
                    name="surface"
                    onChange={handleChange}
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={appartement.surface}
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
                    label="Nombre de chambre"
                    name="nombreChambre"
                    onChange={handleChange}
                    required
                    value={appartement.nombreChambre}
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
                    label="Ascenseur"
                    name="ascenseur"
                    onChange={handleChange}
                    required
                    type="number"
                    inputProps={{ min: "0", max: "1", step: "1" }}
                    value={appartement.ascenseur}
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
                    label="Agent de securite"
                    name="agentSecurite"
                    type="number"
                    inputProps={{ min: "0", max: "1", step: "1" }}
                    onChange={handleChange}
                    value={appartement.agentSecurite}
                  
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
                label="Ville"
                name="ville"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={appartement.ville}
                variant="outlined"
              >
                {states.map((ville) => (
                  <option
                    key={ville.id}
                    value={JSON.stringify(ville.id)}
                  >
                    {ville.name}
                  </option>
                ))}
              </TextField>
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
              onClick={saveAppartement}
            >
              Enregistrer
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

Appartement.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Appartement;
