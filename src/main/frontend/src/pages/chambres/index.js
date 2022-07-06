import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentChambre from 'src/components/clientSide/ComponentChambre';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Chambres = () => {
  return (
    <>
    <Head>
      <title>Chambres | {process.env.APP_NAME}</title>
    </Head>
    <NavigationComponent/>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ComponentChambre/>
      </Container>
    </Box>
  </>
  );
};

Chambres.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Chambres;
