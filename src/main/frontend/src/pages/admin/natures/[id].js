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

const Nature = () => {
  const router = useRouter()
  const { id } = router.query
  const [nature, setNature] = useState({
    description: '',
    photo:'',
    type: '',
    map:'',
    villeId: ''
  });

  const handleChange = (event) => {
    setNature({
      ...nature,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=> {
    const fetchNature = async () => {
      try {
        const response = await fetch(`${process.env.API_BASE_URL}/natures/`+ id, {
          method: "GET",
          headers: {
            "Content-Type" : "applciation/json",
          },
        });
        const _nature = await response.json();
        setNature(_nature);
      } catch(error) {
        console.log(error);
      }
    };
    if(id) {
      fetchNature();
    }
    
}, [id]);

const DivUploadButton = asUploadButton((props) => {
  useItemFinishListener((item) => {
    nature.photo = item.uploadResponse.data.fileName;  
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

  const updateNature = async(e) => {
    e.preventDefault();
    let bodyForm = {
      id: nature.id,
      description: nature.description,
      type: nature.type,
      map: nature.map,
      photo: nature.photo,
      ville: {
        id: nature.villeId
      }
    };
    const response = await fetch(`${process.env.API_BASE_URL}/natures/` + id, {
      method:"PUT",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": authHeader().Authorization,
      },
      body : JSON.stringify(bodyForm),
    });

    if(!response.ok) {
      throw new Error("Une erreur s'est produite");
    }

    Router.push('/admin/natures');
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
        Natures | Administration
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
          Natures
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
        <Card {...nature}>
            <CardContent>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}
            >
                <Avatar
                src={`${process.env.IMAGE_BASE_URL}`+nature.photo}
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
                {nature.type}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {nature.description}
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
            {...nature}
        >
        <Card>
            <CardHeader
            subheader="Les informations peuvent être modifiées"
            title="Nature"
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
                    value={nature.description}
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
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    required
                    value={nature.type}
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
                    value={nature.map}
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
                value={nature.villeId}
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
            onClick={updateNature}
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

Nature.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Nature;
