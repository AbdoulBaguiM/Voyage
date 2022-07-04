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
import React, {useState} from "react";
import Router from 'next/router';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

const Hotel = () => {
  
  const [hotel, setHotel] = useState({
    name: '',
    appreciation: '',
    photo: '',
  });

  const types = ([
    {
      "id":0,
      "name": "Riad"
    },
    {
      "id":1,
      "name": "Hôtel"
    }
  ]);

  const handleChange = (event) => {
    setHotel({
      ...hotel,
      [event.target.name]: event.target.value
    });
  };

  const DivUploadButton = asUploadButton((props) => {
    useItemFinishListener((item) => {
      hotel.photo = item.uploadResponse.data.fileName;  
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

  const saveHotel = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.API_BASE_URL}/hotels`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });

    if(!response.ok){
      throw new Error("Une erreur s'est produite");
    }
    Router.push('/admin/hotels');
  };

  return (
  <>
    <Head>
      <title>
        Hôtel | Administration
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
          Hôtel | Riad
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
        <Card {...hotel}>
            <CardContent>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}
            >
                <Avatar
                src={`${process.env.IMAGE_BASE_URL}`+hotel.photo}
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
                {hotel.name}
                </Typography>
                <Typography
                color="textSecondary"
                variant="body2"
                >
                {hotel.appreciation}
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
            {...hotel}
        >
        <Card>
            <CardHeader
            subheader="Les informations peuvent être modifiées"
            title="Hôtel"
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
                    value={hotel.name}
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
                    label="Appreciation"
                    name="appreciation"
                    type="number"
                    inputProps={{ min: "1", max: "5", step: "1" }}
                    onChange={handleChange}
                    required
                    value={hotel.appreciation}
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
                select
                SelectProps={{ native: true }}
                value={hotel.type}
                variant="outlined"
              >
                {types.map((type) => (
                  <option
                    key={type.id}
                    value={type.id==0 ? false : true}
                  >
                    {type.name}
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
            onClick={saveHotel}
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

Hotel.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Hotel;
