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
import {Star as StarIcon} from '../../icons/star';
import {Town as TownIcon} from '../../icons/town';
import { HomeLayout } from '../../components/clientSide/home-layout';
import { NavigationComponent } from '../../components/clientSide/NavigationComponent';
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
  
  const [review, setReview] = useState({
    note: '',
    message:''
  });

  const handleChange = (event) => {
    setLogement({
      ...logement,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeOnReview = (event) => {
    setReview({
      ...review,
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

  const fetchReview = () => {
    api.get('/reviews/'+currentUser?.id+'/'+logement.id).then(res => {
        setReview(res.data);
    });
  };

  useEffect(()=> {
    fetchReview();
  }, [currentUser?.id, logement.id]);

  const [value, setValue] = React.useState(0);

  const sendReview = async(e) => {
    e.preventDefault();
    if(review.id != null){
      let bodyForm = {
        id: review.id,
        note: value,
        message: review.message,
        user: {
          id : currentUser?.id
        },
        logement: {
          id: logement.id
        }
      };
      
      await api.put('/reviews/' + review.id, {...bodyForm})
                                .catch(function (error) {
                                  if (error.response) {
                                    // The request was made and the server responded with a status code
                                    // that falls out of the range of 2xx
                                    console.log(error.response.data);
                                    throw new Error("Une erreur s'est produite");
                                  }
                                });
  
    } else {
      let bodyForm = {
        note: value,
        message: review.message,
        user: {
          id : currentUser?.id
        },
        logement: {
          id: logement.id
        }
      };
      
      await api.post('/reviews/', {...bodyForm})
                                .catch(function (error) {
                                  if (error.response) {
                                    // The request was made and the server responded with a status code
                                    // that falls out of the range of 2xx
                                    console.log(error.response.data);
                                    throw new Error("Une erreur s'est produite");
                                  }
                                });
  
    }
    Router.reload(window.location.pathname)
  };

  return (
  <>
    <Head>
      <title>
        Logement | {process.env.APP_NAME}
      </title>
    </Head>
    <div style={{marginTop: '50px'}}>
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
                 <Box sx={{ p: 2 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <Grid
                    item
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <TownIcon color="action" />
                    <Typography
                      color="textSecondary"
                      display="inline"
                      sx={{ pl: 1 }}
                      variant="body2"
                    >
                      {logement.villeName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <StarIcon color="action" />
                    <Typography
                      color="textSecondary"
                      display="inline"
                      sx={{ pl: 1 }}
                      variant="body2"
                    >
                      {logement.rating_cache}
                      {' '}
                    </Typography>
                      </Grid>
                      </Grid>
                      </Box>
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
                    variant="standard"
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Surface (m²)"
                    name="surface"
                    type="number"
                    onChange={handleChange}
                    required
                    value={logement.surface}
                    variant="standard"
                    inputProps={
                        { readOnly: true, step: "0.01" }
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
                    variant="standard"
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
                    variant="standard"
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
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {logement.rating_count} Review(s) pour ce logement. Dites nous ce que vous en pensez.
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
                                        <Typography
                                          color="textSecondary"
                                          variant="body2"
                                          >
                                          {review.userMail}
                                        </Typography>
                                        
                                        <Rating
                                            name="simple-controlled"
                                            value={review.note}
                                            readOnly
                                        />
                                        
                                        <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="body"
                                        sx={{ml:2}}
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
                                onChange={handleChangeOnReview}
                                required
                                value={currentUser?.name}
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
                                    label="Message"
                                    name="message"
                                    onChange={handleChangeOnReview}
                                    required
                                    value={review.message}
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
    </div>
  </>
  );
};

Logement.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Logement;
