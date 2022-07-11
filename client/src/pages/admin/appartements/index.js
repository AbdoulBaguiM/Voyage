import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AppartementListResults } from '../../../components/adminSide/appartement/product-card';
import { AppartementListToolbar } from '../../../components/adminSide/appartement/product-list-toolbar';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';


const Appartements = () => {
  return (
    <>
    <Head>
      <title>
        Appartements | Administration
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
        <AppartementListToolbar />
        <Box sx={{ mt: 3 }}>
          <AppartementListResults/>
        </Box>
      </Container>
    </Box>
  </>
  );
};

Appartements.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Appartements;
