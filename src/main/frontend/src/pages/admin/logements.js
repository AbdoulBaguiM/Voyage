import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../../components/adminSide/logement/product-list-toolbar';
import { ProductCard } from '../../components/adminSide/logement/product-card';
import { DashboardLayout } from '../../components/adminSide/dashboard-layout';
import axios from "axios";
import React, {useState, useEffect} from "react";

const Products = () => {
  const [logements, setLogements] = useState([]);

  const fetchLogements = () => {
    axios.get(`${process.env.API_BASE_URL}/logements`).then(res => {
      setLogements(res.data);
    });
  };

  useEffect(()=> {
      fetchLogements();
  }, []);

  const deleteProduct = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/logements/`+ id, {
      method: "DELETE",
    }).then((res) => {
      if(logements) {
        setLogements((prevElement) => {
          return prevElement.filter((logement) => logement.id !== id);
        });
      }
    });
  };

  return (
  <>
    <Head>
      <title>
        Logements | Administration
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
            {logements.map((product) => (
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
