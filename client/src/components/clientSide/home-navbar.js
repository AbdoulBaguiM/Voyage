import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Logout as LogoutIcon } from '../../icons/logout';
import AuthService from "../../services/auth.service";
import NextLink from 'next/link';
import {Logo} from '../../icons/logo'
import { getInitials } from 'src/utils/get-initials';

const HomeNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const HomeNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const currentUser = AuthService.getCurrentUser();
  const logOut = () => {
    AuthService.logout();
  };
  
  return (
    <>
      <HomeNavbarRoot
        sx={{
          width: {
            lg: '100%'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >   
            <NextLink
                href="/"
                passHref
                >
                <a>
                <Logo
                    sx={{
                    height: 42,
                    width: 42
                    }}
                />
                </a>
            </NextLink>
            <a href='/'  className='appTitle'>{process.env.APP_NAME}</a>
            <Box sx={{ flexGrow: 1 }} />
            
            { currentUser ?
            <a href='/my-profile'>
            <Tooltip title="Mon Profil">
                <IconButton sx={{ ml: 1 }}>
                <UserCircleIcon fontSize="medium"/>
                </IconButton>
            </Tooltip> 
            </a> 
            : '' 
            }

            { currentUser ? 
            <Tooltip title="Déconnexion">
                <IconButton sx={{ ml: 1 }}>
                <LogoutIcon onClick={logOut} fontSize="medium"/>
                </IconButton>
            </Tooltip> 
            : '' 
            }

            { currentUser ? 
                <Tooltip title={currentUser?.email}>
                    <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                        ml: 1
                    }}
                    src={currentUser?.avatar}
                    >
                      { getInitials(currentUser.name + ' ' + currentUser.lastName) }
                    </Avatar>
                </Tooltip>
                : 
                  <a href='/login'>
                    <Tooltip title="Connectez-vous">
                      <Avatar
                      sx={{
                          height: 35,
                          width: 35,
                          ml: 1
                      }}
                      >
                        <UserCircleIcon fontSize="medium" />  
                      </Avatar>
                    </Tooltip>
                  </a> 
            }
        </Toolbar>
      </HomeNavbarRoot>
    </>
  );
};