"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { APP_BAR_HEIGHT } from "@/constants";
import { theme } from "@/utils/theme";
import NavBar from "@/components/Docs/navigation/NavBar";
import SideBar from "@/components/Docs/navigation/SideBar";
import Footer from "@/components/Docs/footer/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const [top, setTop] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderChildren = (children: ReactNode) => {
    return children;
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const currentScrollTop = document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          setTop(-(APP_BAR_HEIGHT + 20));
        } else {
          setTop(0);
        }

        setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollTop, isMobile]);

  return (
    <Box
      sx={(theme) => ({
        display: isMobile ? "block" : "flex",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Box
        sx={{
          mt: `${
            router.asPath.includes("docs") ? 0 : isMobile ? 0 : APP_BAR_HEIGHT
          }px`,
          width: "100%",
        }}
      >
        {router.asPath.includes("docs") ? (
          <>
            <NavBar />
            <div className="flex">
              <SideBar className="max-md:hidden" />
              {renderChildren(children)}
            </div>

            <Footer />
          </>
        ) : (
          renderChildren(children)
        )}
      </Box>
      {/* <Box sx={{ width: '100%' }}>{renderChildren(children)}</Box> */}
    </Box>
  );
};

export default DashboardLayout;
