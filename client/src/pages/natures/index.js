import Head from 'next/head';
import { Box, Container } from '@mui/material';
import ComponentNature from 'src/components/clientSide/ComponentNature';
import { HomeLayout } from 'src/components/clientSide/home-layout';
import { NavigationComponent } from 'src/components/clientSide/NavigationComponent';

const Natures = () => {
  return (
    <>
    <Head>
      <title>Nature | {process.env.APP_NAME}</title>
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
          <ComponentNature/>
        </Container>
      </Box>
    </div>
  </>
  );
};

Natures.getLayout = (page) => (
  <HomeLayout>
    {page}
  </HomeLayout>
);

export default Natures;
