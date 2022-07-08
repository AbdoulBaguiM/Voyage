import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentAppart from 'src/components/clientSide/ComponentAppartement';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Appartements = () => {
  return (
    <>
    <Head>
      <title>Appartements | {process.env.APP_NAME}</title>
    </Head>
    
    <div style={{marginTop: '30px'}}>
      <NavigationComponent/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ComponentAppart/>
        </Container>
      </Box>
    </div>
  </>
  );
};

Appartements.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Appartements;