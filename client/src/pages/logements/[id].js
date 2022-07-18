import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    Box,
    Card,
    Container,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Rating,
    TextField,
    Typography,
    Button,
    Avatar
  } from '@mui/material';
import { HomeLayout } from '../../components/clientSide/home-layout';
import React, {useState, useEffect} from "react";
import Router from 'next/router';
import AuthService from 'src/services/auth.service';
import api from 'src/services/api'

const Logement = () => {
  const currentUser = AuthService.getCurrentUser();
  const router = useRouter()
  const { id } = router.query
  const [logement, setLogement] = useState({
    description: '',
    photo:'',
    surface: '',
    contact:'',
    email:'',
    villeId: ''
  });

  const handleChange = (event) => {
    setLogement({
      ...logement,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=> {
    const fetchLogement = async () => {
      try {
        const response = await api.get('/logements/'+ id);
        setLogement(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    if(id) {
      fetchLogement();
    }
    
}, [id]);

const [value, setValue] = React.useState(0);

  const sendReview = async(e) => {
    e.preventDefault();
    let bodyForm = {
      id: logement.id,
      surface: logement.surface,
      description: logement.description,
      email: logement.email,
      contact: logement.contact,
      photo: logement.photo,
      ville: {
        id: logement.villeId
      }
    };
    
    await api.put('/logements/' + id, {...bodyForm})
                              .catch(function (error) {
                                if (error.response) {
                                  // The request was made and the server responded with a status code
                                  // that falls out of the range of 2xx
                                  console.log(error.response.data);
                                  throw new Error("Une erreur s'est produite");
                                }
                              });

    Router.push('/admin/logements');
  };

  return (
  <>
    <Head>
      <title>
        Logement | {process.env.APP_NAME}
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
          {logement.description}
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
                <img
                src={`${process.env.IMAGE_BASE_URL}`+logement.photo}
                width={250}
                height={250}
                />
                <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
                >
                {logement.contact}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {logement.email}
                </Typography>
            </Box>
            </CardContent>
            <Divider />
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
            title="Détails"
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
                    label="Surface"
                    name="surface"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    onChange={handleChange}
                    required
                    value={logement.surface}
                    variant="outlined"
                    inputProps={
                        { readOnly: true, }
                    }
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Contact"
                    name="contact"
                    onChange={handleChange}
                    required
                    value={logement.contact}
                    variant="outlined"
                    inputProps={
                        { readOnly: true, }
                    }
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
                    inputProps={
                        { readOnly: true, }
                    }
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
                    value={logement.villeName}
                    variant="outlined"
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
            </Grid>
            </CardContent>
            <Divider />
        </Card>
        </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
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
            Reviews
            </Typography>
            <Grid
            container
            spacing={3}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Card {...logement}>
                        <CardContent>
                            <Grid
                            container
                            direction="row"
                            spacing={3}
                            >
                                {logement.reviews?.map((review) => (
                                    <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    >
                                        <Avatar
                                        src={`${process.env.IMAGE_BASE_URL}`+review.userPhoto}
                                        sx={{
                                            height: 64,
                                            mb: 2,
                                            width: 64
                                        }}
                                        />
                                        <Rating
                                            name="simple-controlled"
                                            value={review.note}
                                            disabled
                                        />
                                        <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="body"
                                        >
                                        {review.userMail}
                                        </Typography>
                                        <Typography
                                        color="textSecondary"
                                        variant="body2"
                                        >
                                        {review.message}
                                        </Typography>  
                                    </Grid>
                                    ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Card>
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
                                value={currentUser?.name}
                                variant="outlined"
                                disabled
                            />

                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    onChange={handleChange}
                                    required
                                    value=""
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                <Typography component="legend">Note</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                { currentUser ? 
                                    <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={sendReview}
                                    >
                                        Envoyer
                                    </Button>
                                :
                                <Typography
                                color="textSecondary"
                                variant="body2"
                                >
                                    Connectez vous afin de laisser une review
                                </Typography>
                                }
                            
                                
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </Box>
  </>
  );
};

Logement.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Logement;
