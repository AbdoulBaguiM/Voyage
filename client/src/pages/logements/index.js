import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';
import ComponentLogement from 'src/components/clientSide/ComponentLogement';

const Logements = () => {
  return (
    <>
    <Head>
      <title>Logements | {process.env.APP_NAME}</title>
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
        <Container maxWidth={false}>
          <ComponentLogement/>
        </Container>
      </Box>
    </div>
  </>
  );
};

Logements.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Logements;
