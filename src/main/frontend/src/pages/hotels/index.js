import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import ComponentHotel from 'src/components/clientSide/ComponentHotel';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Hotels = () => {
  return (
    <>
    <Head>
      <title>Hôtels | {process.env.APP_NAME}</title>
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
        <ComponentHotel/>
      </Container>
    </Box>
  </>
  );
};

Hotels.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Hotels;
