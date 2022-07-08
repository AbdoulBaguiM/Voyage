import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../../components/adminSide/hotel/product-list-toolbar';
import { ProductCard } from '../../../components/adminSide/hotel/product-card';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import React, {useState, useEffect} from "react";
import api from 'src/services/api'

const Products = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = () => {
    api.get('/hotels').then(res => {
      setHotels(res.data);
    });
  };

  useEffect(()=> {
    fetchHotels();
  }, []);

  const deleteHotel = (e,id) => {
    e.preventDefault();
    api.delete('/hotels/'+ id).then((res) => {
      if(hotels) {
        setHotels((prevElement) => {
          return prevElement.filter((hotel) => hotel.id !== id);
        });
      }
    });
  };

  return (
  <>
    <Head>
      <title>
        Hôtels | Administration
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {hotels.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} deleteHotel={deleteHotel}/>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
  );
};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
