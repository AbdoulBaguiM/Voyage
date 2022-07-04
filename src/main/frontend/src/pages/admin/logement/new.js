import Head from 'next/head';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography
  } from '@mui/material';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";
import Router from 'next/router';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

const Logement = () => {
  
  const [logement, setLogement] = useState({
    surface: '',
    description: '',
    contact: '',
    email: '',
    photo: '',
    ville: {
        id: ''
    }
  });

  const handleChange = (event) => {
    setLogement({
      ...logement,
      [event.target.name]: event.target.value
    });
  };

  const DivUploadButton = asUploadButton((props) => {
    useItemFinishListener((item) => {
      logement.photo = item.uploadResponse.data.fileName;  
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

  const saveLogement = async (e) => {
    e.preventDefault();
    let bodyForm = {
      surface: logement.surface,
      description: logement.description,
      email: logement.email,
      contact: logement.contact,
      photo: logement.photo,
      ville: {
        id: logement.ville
      }
    };
    const response = await fetch(`${process.env.API_BASE_URL}/logements`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(bodyForm),
    });

    if(!response.ok){
      throw new Error("Une erreur s'est produite");
    }
    Router.push('/admin/logements')
      
  };

  const [states, setStates] = useState([]);

  const fetchStates = () => {
    axios.get(`${process.env.API_BASE_URL}/villes`).then(res => {
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
        Logement | Administration
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
          Logement
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
        <Card {...logement}>
            <CardContent>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}
            >
                <Avatar
                src={`${process.env.IMAGE_BASE_URL}`+logement.photo}
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
                {logement.email}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {logement.contact}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {logement.surface} m²
                </Typography>
            </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Uploady
                destination={{ url: `${process.env.API_BASE_URL}/upload`}}>
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
            {...logement}
        >
        <Card>
            <CardHeader
            subheader="Les informations peuvent être modifiées"
            title="Logement"
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
                    value={logement.description}
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
                    value={logement.contact}
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
                    value={logement.email}
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
                    value={logement.surface}
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
                value={logement.ville}
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
            onClick={saveLogement}
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

Logement.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Logement;
