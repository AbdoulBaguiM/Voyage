import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { Home, Search, Heart, User } from "react-feather";

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            borderBottom: active && '1px solid grey',  
            color: active ? 'black' : '#808080',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            textAlign: 'center',
            textTransform: 'none',
            borderRadius: '0px',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'black' : '#808080'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
