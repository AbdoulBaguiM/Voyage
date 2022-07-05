import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import AuthService from 'src/services/auth.service';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [checked, setChecked] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    
    if(!currentUser)
      Router.push("/errors/notLoggedIn");
    else 
      if(!currentUser.roles.includes("ROLE_ADMIN")) {
        Router.push("/errors/notAuthorized");
      }
    else {
      setChecked(true)
    }
  }, [currentUser]);
  
  if (!checked) return null;

  return (
    <>
      <DashboardLayoutRoot>
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
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
