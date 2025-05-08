"use client";

import React, { useState } from "react";
import Logo from "../ui/logo";
import { menuData, menuDropdownData, submenuData } from "@/data/menuData";
import { fontSize } from "@/style/fontSize";
import LocationSelector from "../LocationSelector";
import { MainWrapper } from "../ui/MainWrapper";
import ChevronSVG from "@/assets/svg/outline-chevron_right.svg";
import PhoneSVG from "@/assets/svg/bx-phone-call.svg.svg";
import SearchSVG from "@/assets/svg/bx-search.svg.svg";
import BasketSVG from "@/assets/svg/bx-basket.svg.svg";
import BonusSVG from "@/assets/svg/bonus.svg";
import VetclinicSVG from "@/assets/svg/vethclinic.svg";
import Link from "next/link";
import Profile from "../Profile";

import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/store/api/userApi";

const Header = () => {
  const { data, error, isLoading } = useGetProfileQuery();
  const router = useRouter();
  const [isLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке профиля</div>;

  console.log("Profile data:", data);
  return (
    <MainWrapper>
      {isLogin ? (
        <h1>Logout</h1>
      ) : (
        <div className="flex flex-col py-[15px] mx-auto w-full">
          <div className=" flex items-center gap-[54px]">
            <LocationSelector />
            <div className="flex gap-[25px] ">
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

            <div className="relative w-full  ml-[31px] mt-[10px] ">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className={`${fontSize.medium_16} w-full text-[#848992] h-[60px] border border-[#C8CBD0] outline-none pl-[20px] pr-[45px] rounded-sm`}
              />
              <SearchSVG className="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-[#848992] cursor-pointer" />
            </div>
            <div
              className={`mt-[10px] cursor-pointer ml-[15px] border rounded-sm h-[60px] border-[#C8CBD0] flex items-center justify-center px-[10px] ${
                data?.user?.email ? "max-w-full inline-flex" : "w-[148px]"
              }`}
            >
              {isLogin ? (
                <Profile />
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="text-[#FE9015] cursor-pointer truncate text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {data?.user?.email ? data.user.email : "Login"}
                </button>
              )}
            </div>

            <div className="mt-[10px] cursor-pointer ml-[15px] border rounded-sm max-w-[133px] w-full h-[60px] border-[#C8CBD0] flex items-center justify-center">
              <div className="relative flex items-center">
                <BasketSVG />
                <div className="ml-[10px] rounded-full bg-[#ED1C22] text-[12px] text-white w-[16px] h-[16px] flex items-center justify-center absolute top-[-10px] right-[-10px]">
                  5
                </div>
              </div>
              <div className="ml-[10px]">1150 UAH</div>
            </div>
          </div>
          <div className="flex mt-[20px] items-center justify-between">
            <div className="flex gap-[35px] ">
              {submenuData.map((item) => (
                <Link
                  key={item.id}
                  href={item?.path}
                  className="flex items-center"
                >
                  {item.title}{" "}
                  <span className="ml-[8px]">{item?.icon && <BonusSVG />}</span>
                </Link>
              ))}
            </div>
            <div className="flex gap-[35px]">
              <Link href={"/franchise"}>Франчайзинг</Link>
              <Link href={"/vetchling"} className="flex items-center">
                Ветклиника
                <span className="ml-[8px]">
                  <VetclinicSVG />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </MainWrapper>
  );
};

export default Header;
