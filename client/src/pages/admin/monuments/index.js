import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../../components/adminSide/monument/product-list-toolbar';
import { ProductCard } from '../../../components/adminSide/monument/product-card';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import React, {useState, useEffect} from "react";
import api from 'src/services/api'

const Products = () => {
  const [monuments, setMonuments] = useState([]);

  const fetchMonuments = () => {
    api.get('/monuments').then(res => {
      setMonuments(res.data);
    });
  };

  useEffect(()=> {
      fetchMonuments();
  }, []);

  const deleteProduct = (e,id) => {
    e.preventDefault();
    api.delete('/monuments/'+ id)
    .then((res) => {
      if(monuments) {
        setMonuments((prevElement) => {
          return prevElement.filter((monument) => monument.id !== id);
        });
      }
    });
  };

  return (
  <>
    <Head>
      <title>
        Monuments | Administration
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
            {monuments.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} deleteProduct={deleteProduct}/>
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
