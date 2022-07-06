import Head from 'next/head';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HomeNavbar } from './home-navbar';
import NFooter from './NFooter';

const HomeLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 0
  }
}));

export const HomeLayout = (props) => {
    const { children } = props;
  
    return (
      <>
        <Head>
          <title>Chargement...</title>
        </Head>
        <HomeLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </HomeLayoutRoot>
        <HomeNavbar/>
        <NFooter/>
      </>
    );
  };
  