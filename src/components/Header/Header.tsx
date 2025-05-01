"use client";

import React, { useState } from "react";
import Logo from "../ui/logo";
import { menuData, menuDropdownData } from "@/data/menuData";
import { fontSize } from "@/style/fontSize";
import LocationSelector from "../LocationSelector";
import { MainWrapper } from "../ui/MainWrapper";
import ChevronSVG from "@/assets/svg/outline-chevron_right.svg";

type Props = {};

const Header = (props: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <MainWrapper>
      {isLogin ? (
        <h1>Logout</h1>
      ) : (
        <div className="flex flex-col py-[15px] mx-auto">
          <div className=" flex items-center gap-[54px]">
            <LocationSelector />
            <div className="flex gap-[25px] ">
              {" "}
              <div className="flex gap-[25px] ">
                {menuData.map((item) => (
                  <div
                    key={item.id}
                    className={`${fontSize.medium}  hover:text-[#FE9015]`}
                  >
                    <a href={item.path}>{item.title}</a>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div
                  className="flex gap-[3px] items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button  className={`${fontSize.medium}  hover:text-[#FE9015]`} >
                    Ещё
                  </button>

                  <ChevronSVG
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white border   z-10">
                    {menuDropdownData.map((item) => (
                      <div
                        key={item.id}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <a href={item.path}>{item.title}</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Логотип */}
          <div className="mt-[8px]">
          
            <Logo />
          </div>
        </div>
      )}
    </MainWrapper>
  );
};

export default Header;
