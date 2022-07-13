import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentMonument from 'src/components/clientSide/ComponentMonument';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Monuments = () => {
  return (
    <>
    <Head>
      <title>Monuments | {process.env.APP_NAME}</title>
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
          <ComponentMonument/>
        </Container>
      </Box>
    </div>
  </>
  );
};

Monuments.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Monuments;
