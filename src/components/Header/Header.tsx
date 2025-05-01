"use client";

import React, { useState } from "react";
import Logo from "../ui/logo";
import { menuData, menuDropdownData } from "@/data/menuData";
import { fontSize } from "@/style/fontSize";
import LocationSelector from "../LocationSelector";
import { MainWrapper } from "../ui/MainWrapper";
import ChevronSVG from "@/assets/svg/outline-chevron_right.svg";
import PhoneSVG from "@/assets/svg/bx-phone-call.svg.svg";
import SearchSVG from "@/assets/svg/bx-search.svg.svg";
import Link from "next/link";

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
              <div className="flex gap-[25px] items-center">
                {menuData.map((item) => (
                  <div
                    key={item.id}
                    className={`${fontSize.medium}  hover:text-[#FE9015]`}
                  >
                    <a href={item.path}>{item.title}</a>
                  </div>
                ))}
              </div>
              <div className="relative flex items-center">
                <div
                  className="flex gap-[3px] items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button
                    className={`${fontSize.medium}  hover:text-[#FE9015]`}
                  >
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
              <div className="flex gap-[10px] items-center">
                <PhoneSVG />
                <Link href="tel: +3(3452)594945">+3 (3452) 59-49-45</Link>
              </div>
              <div
                className={`${fontSize.medium_14} hover:text-[#FE9015] cursor-pointer`}
              >
                Заказать звонок
              </div>
            </div>
          </div>

          {/* Логотип */}
          <div className="flex items-center">
            <div className="mt-[8px]">
              <Logo />
            </div>

            <div className="relative w-full max-w-[641px] ml-[31px] mt-[10px]">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className={`${fontSize.medium_16} w-full text-[#848992] h-[60px] border border-[#848992] outline-none pl-[20px] pr-[45px] rounded-sm`}
              />
              <SearchSVG className="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-[#848992] cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </MainWrapper>
  );
};

export default Header;
