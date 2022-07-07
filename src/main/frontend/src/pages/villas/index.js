import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentVilla from 'src/components/clientSide/ComponentVilla';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Villas = () => {
  return (
    <>
    <Head>
      <title>Villas | {process.env.APP_NAME}</title>
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
          <ComponentVilla/>
        </Container>
      </Box>
    </div>
  </>
  );
};

Villas.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Villas;
