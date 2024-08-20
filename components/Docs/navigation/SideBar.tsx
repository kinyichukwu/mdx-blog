"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/utils/theme";
import { DocArray, DocItem, useDocs } from "@/context/DocsContext";

const SideBar = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { docs } = useDocs();

  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<DocItem[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const flattenData = (data: DocArray): DocItem[] => {
    return data.flat(Infinity) as DocItem[];
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
      const results = flattenData(docs).filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query === "") {
      setFilteredData([]);
      setShowDropdown(false);
    }
  }, [query]);

  const linkClass = (href: string) =>
    `block py-2 px-4 rounded transition duration-200 text-[.875rem]  ${
      router.pathname === href
        ? "bg-[#232917] text-[#9be100]"
        : "hover:bg-[#232917] text-[#787878] hover:text-[#9be100]"
    }`;

  return (
    <nav
      className={`${className} max-md:w-full bg-[#0d1117] text-[#787878] w-[300px] p-4 flex-col border-r border-r-white/10 sticky top-0 h-screen min-w-[300px]`}
    >
      <div className="relative mb-10">
        <div className="relative">
          <input
            onChange={handleSearch}
            type="text"
            value={query}
            placeholder="Search Docs"
            className="w-full py-2 pl-10 pr-4 text-sm text-[#787878] bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9be100] placeholder-[#787878] focus:text-[#9be100]"
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-[120%] left-0 w-full border border-white/10 bg-[#0d1117] text-white max-h-52 rounded-md overflow-y-auto z-10 p-2"
            >
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={() => {
                      setQuery("");
                      setShowDropdown(false);
                    }}
                  >
                    <p className="hover:text-[#9be100] font-semibold text-sm p-3 cursor-pointer rounded-md hover:bg-[#9be100]/10">
                      {item.title.replaceAll("#", "")}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-white/50 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#787878]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <ul className="space-y-2 mb-auto">
        <li>
          <Link href="/docs" className={linkClass("/docs")}>
            Introduction
          </Link>
        </li>
        <li>
          <Link href="/docs/research" className={linkClass("/docs/research")}>
            AI Research Paper
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
