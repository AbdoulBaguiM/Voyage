import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../../components/adminSide/dashboard/budget';
import { LatestOrders } from '../../components/adminSide/dashboard/latest-orders';
import { LatestProducts } from '../../components/adminSide/dashboard/latest-products';
import { Sales } from '../../components/adminSide/dashboard/sales';
import { TasksProgress } from '../../components/adminSide/dashboard/tasks-progress';
import { TotalCustomers } from '../../components/adminSide/dashboard/total-customers';
import { TotalProfit } from '../../components/adminSide/dashboard/total-profit';
import { TrafficByDevice } from '../../components/adminSide/dashboard/traffic-by-device';
import { DashboardLayout } from '../../components/adminSide/dashboard-layout';

const Dashboard = () => {

  return(
  <>
    <Head>
      <title>
        Panneau d'administration
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;