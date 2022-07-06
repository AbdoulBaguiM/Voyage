import Head from 'next/head';
import { AccountProfileDetails } from '../../../components/adminSide/account/account-profile-details';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import React, {useState, useEffect} from "react";
import {
  Avatar,
  Box,
  Container, Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

const Account = () => {
  
  const [customer, setCustomer] = useState({
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    pays: ''
  });

  const DivUploadButton = asUploadButton((props) => {
    useItemFinishListener((item) => {
      handleCallback(item.uploadResponse.data.fileName);  
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
  
const [avatar, setAvatar] = useState('');

function handleCallback (childData) {
    setAvatar(childData)
}

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
                  src={`${process.env.IMAGE_BASE_URL}/avatar`}
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
          <AccountProfileDetails user={customer} avatar={avatar} new={true}/>
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
