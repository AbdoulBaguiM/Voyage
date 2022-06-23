import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { VilleListResults } from '../../components/ville/ville-list-results';
import { VilleListToolbar } from '../../components/ville/ville-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';

const Villes = () => {
  return (
    <>
    <Head>
      <title>
        Villes | Administration
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <VilleListToolbar />
        <Box sx={{ mt: 3 }}>
          <VilleListResults/>
        </Box>
      </Container>
    </Box>
  </>
  );
};

Villes.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Villes;
