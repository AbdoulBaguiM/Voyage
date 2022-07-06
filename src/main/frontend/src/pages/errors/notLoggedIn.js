import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotLoggedIn = () => (
  <>
    <Head>
      <title>
            Erreur | Veuillez vous connecter
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
                Veuillez vous connectez afin d'accéder au contenu
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            <a href='/login'>Connectez-vous</a> afin de profiter des services proposés par notre plateforme, ou <a href='/register'>créez un compte</a> si vous n'en avez pas.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Retour à la page d'acceuil
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotLoggedIn;
