"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../ui/logo";
import { menuData, menuDropdownData } from "@/data/menuData";
import { fontSize } from "@/style/fontSize";
import LocationSelector from "../LocationSelector";

type Props = {};

const Header = (props: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для дропдауна

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {isLogin ? (
        <h1>Logout</h1>
      ) : (
        <div className="flex gap-[25px] items-center">
          <div className="flex items-center">
          <LocationSelector />
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
              <button
                onClick={toggleDropdown}
                className="text-black hover:text-gray-600 focus:outline-none"
              >
                Ещё
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  {menuDropdownData.map((item) => (
                    <div key={item.id} className="px-4 py-2 hover:bg-gray-100">
                      <a href={item.path}>{item.title}</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Логотип */}
          <Logo />
        </div>
      )}
    </div>
  );
};

export default Header;
