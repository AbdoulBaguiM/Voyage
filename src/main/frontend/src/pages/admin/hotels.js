import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../components/hotel/product-list-toolbar';
import { ProductCard } from '../../components/hotel/product-card';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";

const Products = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = () => {
    axios.get(`${process.env.API_BASE_URL}/hotels`).then(res => {
      console.log(res);
      setHotels(res.data);
    });
  };

  useEffect(()=> {
    fetchHotels();
  }, []);

  const deleteHotel = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/hotels/`+ id, {
      method: "DELETE",
    }).then((res) => {
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
