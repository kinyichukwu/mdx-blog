import React, { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Stack } from "@mui/material";
import { Routes } from "@/constants";
import { theme } from "@/utils/theme";
import { useAuthContext, useLoginModal, usePayment } from "@/context";
import { useRouter } from "next/router";
// import { HamburgerMenu } from '@/components/NavHeader/HamburgerMenu';
import { Squash as Hamburger } from "hamburger-react";

import { mainFontFamily } from "@/pages/_app";
import ThreeDotLoading from "@/components/ThreeDotLoading";

const settings = [
  {
    displayName: "Account",
    route: Routes.ACCOUNT,
    showAvatar: true,
  },
];

function UserSettingsMenu({
  anchorEl,
  handleClose,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) {
  const router = useRouter();
  const { authUser } = useAuthContext();

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      onClose={handleClose}
      open={Boolean(anchorEl)}
      className={mainFontFamily.className}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          elevation: 1,
          sx: {
            mt: 3,
            width: "180px",
            overflow: "visible",
            border: "1px solid background.paper",
            backgroundColor: theme.palette.background.paper,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          },
        },
      }}
    >
      {settings.map((setting) => {
        // if (setting.requiredAdmin && !authUser?.token.claims.isAdmin) return null;
        return (
          <MenuItem
            key={setting.route}
            onClick={() => {
              router.push(setting.route);
              handleClose();
            }}
          >
            <Stack alignItems="center" spacing={1} direction="row">
              {setting.showAvatar && (
                <Avatar
                  src={authUser?.avatar}
                  alt="Avatar"
                  sx={{ width: 20, height: 20 }}
                />
              )}
              <span>{setting.displayName}</span>
            </Stack>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export function SettingsNavHeader() {

  


  return (
    <>
      <Button size="small" variant="contained" onClick={() => window.open('https://www.example.com', '_blank')}>
        Sign in
      </Button>
    </>
  );
}
