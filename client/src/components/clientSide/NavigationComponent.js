import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import { Home } from 'react-feather';
import {Hotel as HotelIcon} from '../../icons/hotel';
import {Logement as LogementIcon} from '../../icons/logement';
import {Town as TownIcon} from '../../icons/town';
import {Leaf as LeafIcon} from '../../icons/leaf';
import {Map as MapIcon} from '../../icons/map';
import {Smiley as SmileyIcon} from '../../icons/smiley';
import {Apps as AppIcon} from '../../icons/apps';

const items = [
  {
    href: '/',
    icon: (<Home />),
    title: 'Acceuil'
  },
  {
    href: '/hotels',
    icon: (<HotelIcon />),
    title: 'Hôtels'
  },
  {
    href: '/appartements',
    icon: (<AppIcon/>),
    title: 'Appartements'
  },
  {
    href: '/logements',
    icon: (<LogementIcon/>),
    title: 'Logements'
  },
  {
    href: '/villes',
    icon: (<TownIcon/>),
    title: 'Villes'
  },
  {
    href: '/villas',
    icon: (<SmileyIcon/>),
    title: 'Villas'
  },
  {
    href: '/natures',
    icon: (<LeafIcon/>),
    title: 'Nature'
  },
  {
    href: '/monuments',
    icon: (<MapIcon/>),
    title: 'Monuments'
  },
];

export const NavigationComponent = (props) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ display: 'flex', backgroundColor: 'white', borderRadius: '15px' }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        
      </Box>
    </>
  );

  if (lgUp) {
    return (
    //   <Drawer
    //     anchor="top"
    //     open
    //     PaperProps={{
    //       sx: {
    //         backgroundColor: 'neutral.900',
    //         color: '#FFFFFF',
    //         width: '100%'
    //       }
    //     }}
    //     variant="permanent"
    //   >
    //     {content}
    //   </Drawer>
    // );
    <div >{content}</div>);
  }

  return (
    <Drawer
      anchor="top"
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: '100%'
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};