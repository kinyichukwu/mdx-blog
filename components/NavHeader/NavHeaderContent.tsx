import React from 'react';
import { Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { PrimaryColor, theme } from '@/utils';
import { useAuthContext } from '@/context';
import Link from '@/components/Link';
import { APP_BAR_HEIGHT, Routes } from '@/constants';
import { useRouter } from 'next/router';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

const navigations = [
  { label: 'Community', href: Routes.COMMUNITY },
  { label: 'Generate', href: Routes.GENERATE, query: 'm=copax' },
  // { label: 'Albums', href: Routes.ALBUMS },
  { label: 'Docs', href: Routes.DOCS },
  // { label: 'Research', href: Routes.RESEARCH },
  { divider: true },
  { label: 'Account', href: Routes.ACCOUNT, requiresAuth: true, onlyMobile: true },
  { label: 'Logout', action: 'logout', requiresAuth: true, onlyMobile: true }
];

// if (CURRENT_DOMAIN !== PRODUCTION_DOMAIN) {
//   navigations.push({ label: 'Outlaw Sky', href: Routes.ART_GENERATOR });
//   navigations.push({ label: 'Games', href: Routes.GAMES });
// }

interface NavHeaderContentProps {
  toggleNavbar?: () => void;
}

export const NavHeaderContent: React.FC<NavHeaderContentProps> = ({ toggleNavbar }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AnimatePresence>
      <Stack
        spacing={2}
        sx={(theme) => ({ backgroundColor: theme.palette.background.default })}
        px={{ xs: 2, md: 0 }}
        zIndex={theme.zIndex.appBar}
        className="max-md:w-full max-md:left-0"
        height={{ xs: '100vh', md: 'unset' }}
        direction={{ xs: 'column', md: 'row' }}
        // position={{ xs: 'fixed', md: 'fixed' }}
        position={isMobile ? 'fixed' : 'unset'}
        display={isMobile ? { md: 'none' } : { xs: 'none', md: 'flex' }}
        style={{
          justifyItems: 'center',
          alignItems: 'center',
          top: APP_BAR_HEIGHT
        }}
      >
        {navigations.map((navigation, index) => (
          <NavigationItem
            key={index}
            navigation={navigation}
            isMobile={isMobile}
            toggleNavbar={toggleNavbar}
          />
        ))}

        {isMobile && (
          <div className="flex justify-center gap-3">
            <a href="https://github.com/cozy-creator">
              <FaGithub href="" className="hover:text-[#76b900] text-[1.5rem]" />
            </a>

            <a href="https://discord.gg/7uGaRzr2V7">
              <FaDiscord href="" className="hover:text-[#76b900] text-[1.5rem]" />
            </a>
          </div>
        )}
      </Stack>
    </AnimatePresence>
  );
};

interface NavigationItemProps {
  navigation: {
    href?: string;
    query?: string;
    route?: string;
    label?: string;
    action?: string;
    divider?: boolean;
    requiresAuth?: boolean;
    onlyMobile?: boolean;
  };
  isMobile: boolean;
  toggleNavbar?: () => void;
}

const NavigationItem = ({ navigation, isMobile, toggleNavbar }: NavigationItemProps) => {
  const { authUser, logout } = useAuthContext();
  const pathname = useRouter();
  const isActive = () => pathname.asPath.includes(navigation?.label?.toLowerCase() as string);

  if (navigation.divider) {
    return <Divider sx={{ p: { md: 0 }, m: { md: 0 }, display: { md: 'none' } }} />;
  }

  const isVisible = navigation.requiresAuth ? authUser : true;
  const isDisplayed = isMobile ? true : !navigation.onlyMobile;

  if (!isVisible || !isDisplayed) return null;

  const handleLinkClick = () => {
    if (navigation.action === 'logout') {
      logout();
    }

    // toggleNavbar?.();
  };

  return (
    <Link
      onClick={handleLinkClick}
      sx={{
        color: isActive() ? PrimaryColor.main : '#f7f7f7',
        textDecoration: 'none',
        display: navigation.onlyMobile && !isMobile ? 'none' : 'unset'
      }}
      href={navigation.href || ''}
    >
      <Typography fontWeight={isMobile ? 'medium' : 'normal'} variant={isMobile ? 'body1' : 'body2'}>
        {navigation.label}
      </Typography>
    </Link>
  );
};
