import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box,Divider, Drawer, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import ThemeToggle from '../ThemeToggle';

const items = [
  {
    href: '/hotels',
    title: 'Hôtels'
  },
  {
    href: '/appartements',
    title: 'Appartements'
  },
  {
    href: '/logements',
    title: 'Logements'
  },
  {
    href: 'villes',
    title: 'Villes'
  },
  {
    href: '/villas',
    title: 'Villas'
  },
  {
    href: '/chambres',
    title: 'Chambres'
  },
  {
    href: '/natures',
    title: 'Nature'
  },
  {
    href: '/monuments',
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
        <Box sx={{ display: 'flex' }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        
        <Divider sx={{ borderColor: '#2D3748' }} />
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
    <div className='navbar'>{content}</div>);
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