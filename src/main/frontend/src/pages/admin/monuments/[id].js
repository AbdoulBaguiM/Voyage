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
import { useRouter } from 'next/router';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import authHeader from 'src/services/auth-header';

const Monument = () => {
  const router = useRouter()
  const { id } = router.query
  const [monument, setMonument] = useState({
    nom: '',
    photo:'',
    historique: '',
    villeId: ''
  });

  const handleChange = (event) => {
    setMonument({
      ...monument,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=> {
    const fetchMonument = async () => {
      try {
        const response = await fetch(`${process.env.API_BASE_URL}/monuments/`+ id, {
          method: "GET",
          headers: {
            "Content-Type" : "applciation/json"
          },
        });
        const _monument = await response.json();
        setMonument(_monument);
      } catch(error) {
        console.log(error);
      }
    };
    if(id) {
      fetchMonument();
    }
    
}, [id]);

const DivUploadButton = asUploadButton((props) => {
  useItemFinishListener((item) => {
    monument.photo = item.uploadResponse.data.fileName;  
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

  const updateMonument = async(e) => {
    e.preventDefault();
    let bodyForm = {
      id: monument.id,
      nom: monument.nom,
      historique: monument.historique,
      photo: monument.photo,
      ville: {
        id: monument.villeId
      }
    };
    const response = await fetch(`${process.env.API_BASE_URL}/monuments/` + id, {
      method:"PUT",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : authHeader().Authorization,
      },
      body : JSON.stringify(bodyForm),
    });

    if(!response.ok) {
      throw new Error("Une erreur s'est produite");
    }

    Router.push('/admin/monuments');
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
        Monuments | Administration
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
          Monuments
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
        <Card {...monument}>
            <CardContent>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}
            >
                <Avatar
                src={`${process.env.IMAGE_BASE_URL}`+monument.photo}
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
                {monument.nom}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {monument.historique}
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
            {...monument}
        >
        <Card>
            <CardHeader
            subheader="Les informations peuvent être modifiées"
            title="Monument"
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
                    name="nom"
                    onChange={handleChange}
                    required
                    value={monument.nom}
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
                    label="Historique"
                    name="historique"
                    onChange={handleChange}
                    required
                    value={monument.historique}
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
                name="villeId"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={monument.villeId}
                variant="outlined"
              >
                {states.map((ville) => (
                  <option
                    key={ville.id}
                    value={ville.id}
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
            onClick={updateMonument}
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

Monument.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Monument;
