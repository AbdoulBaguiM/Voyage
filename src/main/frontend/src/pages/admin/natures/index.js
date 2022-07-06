import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../../components/adminSide/nature/product-list-toolbar';
import { ProductCard } from '../../../components/adminSide/nature/product-card';
import { DashboardLayout } from '../../../components/adminSide/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";
import authHeader from 'src/services/auth-header';

const Products = () => {
  const [natures, setNatures] = useState([]);

  const fetchNatures = () => {
    axios.get(`${process.env.API_BASE_URL}/natures`).then(res => {
      setNatures(res.data);
    });
  };

  useEffect(()=> {
      fetchNatures();
  }, []);

  const deleteProduct = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/natures/`+ id, {
      method: "DELETE",
      headers: authHeader(),
    }).then((res) => {
      if(natures) {
        setNatures((prevElement) => {
          return prevElement.filter((nature) => nature.id !== id);
        });
      }
    });
  };

  return (
  <>
    <Head>
      <title>
        Natures | Administration
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
            {natures.map((product) => (
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
