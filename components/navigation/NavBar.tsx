"use client";

import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import CozyCreatorLogo from "../../public/images/cozycreator.png";
import { usePathname } from "next/navigation";
import Drawer from "./Drawer";
import SideBar from "./SideBar";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/utils/theme";
import { navigations } from "@/constants/routes";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleNavbar = () => setIsOpen(!isOpen);

  const isVoidTech = path.includes("docs");

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [path]);

  useEffect(() => {
    console.log(isMobile);

    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]);

  if (isVoidTech) {
    return null;
  }
  return (
    <div className="top-0 sticky  z-10 bg-[#0d1117] border-b border-b-white/10 flex p-5 py-4 max-md:py-2 justify-between items-center">
      <Link href={"/"} style={{ marginTop: 1, marginLeft: 1 }}>
        <h1
          //   fontWeight="bold"
          //   color="white"
          className="text-[1rem] md:text-[1.3rem] !z-[99]"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textShadow: "0px 0px 20px rgba(0,0,0,0.5)",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <Image
            src={CozyCreatorLogo}
            alt="Cozy Creator Logo"
            className="max-md:w-[45px] max-md:h-[45px] w-[50px] h-[50px]"
            style={{
              borderRadius: "50%",
              border: "2.5px solid #323233",
              boxShadow: "0px 0px 20px 2px rgba(58,58,58,0.51)",
            }}
          />
          Cozy Creator
        </h1>
      </Link>
      <div className="flex gap-5 max-md:hidden">
        {navigations.map((navigation, index) => (
          <NavigationItem
            key={index}
            navigation={navigation}
            isMobile={false}
            toggleNavbar={toggleNavbar}
          />
        ))}
      </div>
      <div className="md:hidden !z-[99]">
        <Hamburger
          toggled={isOpen}
          color="white"
          rounded
          size={25}
          toggle={toggleNavbar}
        />
      </div>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SideBar className="!z-10" />
      </Drawer>
    </div>
  );
};

export default NavBar;

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

const NavigationItem = ({
  navigation,
  isMobile,
  toggleNavbar,
}: NavigationItemProps) => {
  const handleLinkClick = () => {
    toggleNavbar?.();
  };

  return (
    <Link
      onClick={handleLinkClick}
      style={{
        color: "#f7f7f7",
        textDecoration: "none",
        display: "unset",
      }}
      href={navigation.href || ""}
    >
      <p className="text-[15px]">{navigation.label}</p>
    </Link>
  );
};
