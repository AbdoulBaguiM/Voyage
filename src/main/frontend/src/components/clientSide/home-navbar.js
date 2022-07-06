import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Logout as LogoutIcon } from '../../icons/logout';
import AuthService from "../../services/auth.service";
import NextLink from 'next/link';
import {Logo} from '../../icons/logo'

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
            <div style={{ color: "#808080", marginLeft : "20px" }}> <span style={{ fontSize: "25px", fontWeight: "bold" }}>{process.env.APP_NAME}</span></div>
            <Box sx={{ flexGrow: 1 }} />

            { currentUser ? 
            <Tooltip title="Déconnexion">
                <IconButton sx={{ ml: 1 }}>
                <LogoutIcon onClick={logOut} fontSize="small"/>
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
                    <UserCircleIcon fontSize="small" />
                    </Avatar>
                </Tooltip>
                : <Tooltip title="Connectez-vous">
                    <NextLink href='/login'>
                        <a>
                            <Avatar
                            sx={{
                                height: 40,
                                width: 40,
                                ml: 1
                            }}
                            >
                                <UserCircleIcon fontSize="medium" />
                            </Avatar>
                        </a>
                    </NextLink>
                </Tooltip>
            }
        </Toolbar>
      </HomeNavbarRoot>
    </>
  );
};