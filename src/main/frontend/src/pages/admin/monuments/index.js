import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../../components/adminSide/monument/product-list-toolbar';
import { ProductCard } from '../../../components/adminSide/monument/product-card';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";
import authHeader from 'src/services/auth-header';

const Products = () => {
  const [monuments, setMonuments] = useState([]);

  const fetchMonuments = () => {
    axios.get(`${process.env.API_BASE_URL}/monuments`).then(res => {
      setMonuments(res.data);
    });
  };

  useEffect(()=> {
      fetchMonuments();
  }, []);

  const deleteProduct = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/monuments/`+ id, {
      method: "DELETE",
      headers: authHeader(),
    }).then((res) => {
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
