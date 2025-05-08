"use client";
import React, { useEffect } from "react";
import { MainWrapper } from "../ui/MainWrapper";
import { fontSize } from "../../style/fontSize";
import ProfileSection from "./ProfileSection/ProfileSection";
import HistorySection from "./HistorySection/HistorySection";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  addAddress,
  removeAddress,
  updateAddress,
  setActiveTab,
} from "../../store/profileSlice";

import { useGetProfileQuery, useUpdateProfileMutation } from "../../store/api/userApi";

import { RootState } from "@/store/store";

const ProfileComponent = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const { formData, errors, activeTab } = useSelector((state: RootState) => state.profile);

  // Загрузка данных профиля из API
  const { data: profileData, isLoading, error } = useGetProfileQuery();

  useEffect(() => {
    if (profileData && profileData.user) {
      dispatch(
        setFormData({
          name: typeof profileData.user.profile?.name === "string" ? profileData.user.profile.name : "Ваше имя",
          email: profileData.user.email,
          phone: typeof profileData.user.profile?.phone === "string" ? profileData.user.profile.phone : "+3 (912) 345 67 89",
        })
      );
    }
  }, [profileData, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value }: { name: string; value: string } = e.target;
    if (name.startsWith("address-")) {
      dispatch(updateAddress({ index, value }));
    } else {
      dispatch(setFormData({ [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const hasErrors = formData.address.some((addr, index) => {
    //   const error = addr.value.trim() ? "" : "Укажите адрес доставки";
      // dispatch(updateAddress({ index, value: addr.value }));
      // return !addr.value.trim();
    // });


    // if (!hasErrors) {
      updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address.map(a => a.value),
      });
    // }
    
  };

  const tabs = [
    { id: "profile", label: "Учетная запись" },
    { id: "address", label: "Адреса доставки" },
    { id: "history", label: "История заказов" },
    { id: "password", label: "Смена пароля" },
    { id: "logout", label: "Выйти" },
  ];

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;

  return (
    // <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
      <MainWrapper customOuter="pt-[50px]">
        <div className="flex flex-col">
          <h1 className="text-[36px] font-bold">Личный кабинет</h1>
          <div className="flex mt-[50px] gap-[39px]">
            <div className="w-[200px] border-r-[1px] border-[#C8CBD0]">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => dispatch(setActiveTab(tab.id))}
                  className={`cursor-pointer text-[14px] rounded-[4px] mb-[10px] ${
                    activeTab === tab.id
                      ? `${fontSize.medium_16} text-black font-bold`
                      : `${fontSize.medium_16} text-black font-medium`
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="max-w-[400px]">
                {activeTab === "profile" && (
                  <ProfileSection
                    formData={formData}
                    handleChange={(e) => handleChange(e, 0)}
                    handleSubmit={handleSubmit}
                    errors={errors}
                  />
                )}
                {activeTab === "address" && (
                  <div className="text-[16px]">
                    {formData.address.map((addr, index) => (
                      <div key={addr.id} className="mb-[20px] flex items-center gap-[10px]">
                        <div className="flex-1">
                          <label className="text-[#848992] text-[14px] mb-[5px] block">
                            Адрес {index + 1}{" "}
                            {errors.address[index] && (
                              <span className="text-red-500 text-[12px]">
                                {errors.address[index]}
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            name={`address-${index}`}
                            value={addr.value}
                            onChange={(e) => handleChange(e, index)}
                            className={`w-full h-[40px] px-[10px] border rounded-[4px] text-[14px] ${
                              errors.address[index] ? "border-red-500" : "border-[#C8CBD0]"
                            }`}
                          />
                        </div>
                        {formData.address.length > 1 && (
                          <button
                            type="button"
                            onClick={() => dispatch(removeAddress(addr.id))}
                            className="w-[100px] h-[40px] bg-red-500 text-white rounded-[4px] text-[14px] hover:bg-red-600 transition-colors"
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => dispatch(addAddress())}
                      className="w-full h-[50px] bg-[#FE9015] text-white rounded-[4px] text-[16px] font-medium hover:bg-[#E88214] transition-colors mt-[20px]"
                    >
                      Добавить еще адрес
                    </button>
                  </div>
                )}
                {activeTab === "history" && <HistorySection />}
                <button
                  type="submit"
                  className="w-full mt-[20px] h-[50px] bg-[#FE9015] text-white rounded-[4px] text-[16px] font-medium hover:bg-[#E88214] transition-colors"
                >
                  Сохранить
                </button>
              </form>
            </div>
          </div>
         
        </div>
      </MainWrapper>
    // </PersistGate>
  );
};

export default ProfileComponent;