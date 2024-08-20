import React, { useEffect, useState } from 'react';
import { Container, Stack, Fade, Collapse } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme } from '@/utils';
import { Logo } from '@/components';
import Link from '@/components/Link';
import { Routes } from '@/constants';
import { NavHeaderContent } from './NavHeaderContent';
// import { HamburgerMenu } from './HamburgerMenu';
import { Squash as Hamburger } from 'hamburger-react';
import { SettingsNavHeader } from '@/components/NavHeader/SettingsNavHeader';

import { FaGithub, FaDiscord } from 'react-icons/fa';

import { useRouter } from 'next/router';

export const MainNavHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleNavbar = () => setIsOpen(!isOpen);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [router]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <Container sx={{ mt: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Fade in={!isOpen}>
          <Link href={Routes.COMMUNITY} sx={{ mt: 0, ml: 1 }} underline="none">
            <Logo />
          </Link>
        </Fade>

        {!isMobile && <NavHeaderContent />}

        <Stack spacing={2} zIndex={30} alignItems="center" direction="row">
          {!isMobile && (
            <>
              <a href="https://github.com/cozy-creator">
                <FaGithub href="" className="hover:text-[#76b900] text-[1.8rem]" />
              </a>

              <a href="https://discord.gg/7uGaRzr2V7">
                <FaDiscord href="" className="hover:text-[#76b900] text-[1.8rem]" />
              </a>
            </>
          )}

          <Fade in={!isOpen}>
            <div>
              <SettingsNavHeader />
            </div>
          </Fade>

          {isMobile && <Hamburger toggled={isOpen} rounded size={25} toggle={toggleNavbar} />}
        </Stack>
      </Stack>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {isMobile && <NavHeaderContent toggleNavbar={toggleNavbar} />}
      </Collapse>
    </Container>
  );
};
