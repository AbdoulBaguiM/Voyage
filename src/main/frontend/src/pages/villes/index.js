import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentVille from 'src/components/clientSide/ComponentVille';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Villes = () => {
  return (
    <>
    <Head>
      <title>Villes | {process.env.APP_NAME}</title>
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
        <ComponentVille/>
      </Container>
    </Box>
  </>
  );
};

Villes.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Villes;
