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

const Ville = () => {
  const router = useRouter()
  const { id } = router.query
  const [ville, setVille] = useState({
    name: '',
    surface: '',
    meteo: '',
    map: '',
    photo: ''
  });

  const fetchVille = () => {
    axios.get(`${process.env.API_BASE_URL}/villes/${id}`).then(res => {
      setVille(res.data);
    });
  };

  const handleChange = (event) => {
    setVille({
      ...ville,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=> {
    fetchVille();
  }, []);

  const DivUploadButton = asUploadButton((props) => {
    useItemFinishListener((item) => {
      ville.photo = item.uploadResponse.data.fileName;  
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

  const updateVille = async(e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.API_BASE_URL}/villes/` + id, {
      method:"PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(ville),
    });

    if(!response.ok) {
      throw new Error("Une erreur s'est produite");
    }

    Router.push('/admin/villes');
  };

  return (
  <>
    <Head>
      <title>
        Ville | Administration
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
          Ville Touristique
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
          
          <Card {...ville}>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                  src={`${process.env.IMAGE_BASE_URL}`+ville.photo}
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
                  {ville.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {ville.meteo}
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
            {...ville}
          >
          <Card>
            <CardHeader
              subheader="Les informations peuvent être modifiées"
              title="Ville"
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
                    value={ville.name}
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
                    label="Météo"
                    name="meteo"
                    onChange={handleChange}
                    required
                    value={ville.meteo}
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
                    value={ville.surface}
                    inputProps={{ step: "0.01" }}
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
                    label="Carte"
                    name="map"
                    onChange={handleChange}
                    required
                    value={ville.map}
                    variant="outlined"
                  />
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
              onClick={updateVille}
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

Ville.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Ville;
