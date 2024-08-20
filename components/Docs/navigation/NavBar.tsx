"use client";

import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import CozyCreatorLogo from "../../../public/images/cozycreator.png";
import { useRouter } from "next/router";
import Drawer from "./Drawer";
import SideBar from "./SideBar";
import { Fade, useMediaQuery } from "@mui/material";
import { PrimaryColor, theme } from "@/utils/theme";
import { SettingsNavHeader } from "@/components/NavHeader/SettingsNavHeader";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

type subNavType = {
  label: string;
  href: string;
};

const navigations = [
  { label: "Community", href: "/" },
  { label: "Generate", href: "/generate", query: "m=copax" },
  // { label: 'Albums', href: '/albums' },
  { label: "Docs", href: "/docs" },
  // { label: 'Research', href: Routes.RESEARCH },
];

const subNavigations: subNavType[] = [
  { label: "Introduction", href: "/docs" },
  { label: "AI Research Paper", href: "/docs/research" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const isVoidTech = path.asPath.includes("docs");
  const [currentLabel, setCurrentLabel] = useState<subNavType>({
    label: "",
    href: "",
  });

  useEffect(() => {
    const newLabel = subNavigations.find((nav) => path.pathname === nav.href);
    setCurrentLabel(newLabel || { label: "", href: "" });
  }, [path]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [path]);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // if (isVoidTech) {
  //   return null;
  // }
  return (
    <div className="top-0 sticky z-10 bg-[#0d1117] border-b border-b-white/10 flex justify-between items-center p-5 py-[.7rem] max-md:py-2 max-md:flex-col max-md:items-start">
      <Link
        href={"/"}
        className="max-md:hidden"
        style={{ marginTop: 1, marginLeft: 1 }}
      >
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
      {/* Sub Nav for Docs */}
      <div className="md:hidden">
        <p className="text-white/50 text-xs">Documentation</p>
        <div
          onClick={() => toggleNavbar()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <p className="font-semibold">{currentLabel.label}</p>{" "}
          {isOpen ? <RxCaretUp size={25} /> : <RxCaretDown size={25} />}
        </div>
      </div>
      {/* Sub Nav for Docs */}
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

      <Fade className="max-md:hidden" in={!accountOpen}>
        <div>
          <SettingsNavHeader />
        </div>
      </Fade>
      {/* <div className="md:hidden !z-[99]">
        <Hamburger toggled={isOpen} color="white" rounded size={25} toggle={toggleNavbar} />
      </div> */}

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SideBar className="!z-10 !border-r-white/0 !p-5" />
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

  const router = useRouter();

  return (
    <Link
      style={{
        color: navigation.href?.includes("docs")
          ? PrimaryColor.main
          : "#f7f7f7",
        textDecoration: "none",
        display: "unset",
      }}
      href={navigation.href || ""}
    >
      <p className="text-sm">{navigation.label}</p>
    </Link>
  );
};
