"use client";
import React, { useState } from "react";
import { MainWrapper } from "../ui/MainWrapper";
import { fontSize } from "../../style/fontSize";
import ProfileSection from "./ProfileSection/ProfileSection";
import DeleteSVG from "@/assets/svg/delete.svg";
import HistorySection from "./HistorySection/HistorySection";

const ProfileComponent = () => {
  const [formData, setFormData] = useState({
    name: "Николай",
    address: [{ id: 1, value: "" }], // Массив адресов
    orderSource: "",
    password: "",
    phone: "+3 (912) 345 67 89",
    email: "myname@mail.ru",
  });

  const [errors, setErrors] = useState<{
    address: string[]; // Массив ошибок для каждого адреса
  }>({
    address: [],
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newAddresses = [...formData.address];
    newAddresses[index].value = value;

    setFormData((prev) => ({ ...prev, address: newAddresses }));

    const newErrors = [...errors.address];
    newErrors[index] = value.trim() ? "" : "Укажите адрес доставки";
    setErrors((prev) => ({ ...prev, address: newErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = formData.address.some((addr, index) => {
      const error = addr.value.trim() ? "" : "Укажите адрес доставки";
      const newErrors = [...errors.address];
      newErrors[index] = error;
      setErrors((prev) => ({ ...prev, address: newErrors }));
      return !addr.value.trim();
    });

    if (!hasErrors) {
      console.log("Form submitted:", formData);
    }
  };

  const addAddress = () => {
    const newAddress = { id: Date.now(), value: "" };
    setFormData((prev) => ({
      ...prev,
      address: [...prev.address, newAddress],
    }));
    setErrors((prev) => ({
      ...prev,
      address: [...prev.address, ""],
    }));
  };

  const removeAddress = (id) => {
    const newAddresses = formData.address.filter((addr) => addr.id !== id);
    const newErrors = errors.address.filter(
      (_, index) => formData.address[index].id !== id
    );
    setFormData((prev) => ({ ...prev, address: newAddresses }));
    setErrors((prev) => ({ ...prev, address: newErrors }));
  };

  const tabs = [
    { id: "profile", label: "Учетная запись" },
    { id: "address", label: "Адреса доставки" },
    { id: "history", label: "История заказов" },
    { id: "password", label: "Смена пароля" },
    { id: "logout", label: "Выйти" },
  ];

  return (
    <MainWrapper customOuter="pt-[50px]">
      <div className="flex flex-col">
        <h1 className="text-[36px] font-bold">Личный кабинет</h1>
        <div className="flex mt-[50px] gap-[39px]">
          <div className="w-[200px] border-r-[1px] border-[#C8CBD0]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              )}
              {activeTab === "address" && (
                <div className="text-[16px]">
                  {formData.address.map((addr, index) => (
                    <div
                      key={addr.id}
                      className="mb-[20px] flex items-center gap-[10px]"
                    >
                      <div className="flex-1 items-end">
                        <label className="text-[#848992] text-[14px] mb-[5px] block">
                          Адрес {index + 1}{" "}
                          {errors.address[index] && (
                            <span className="text-red-500 text-[12px]">
                              {errors.address[index]}
                            </span>
                          )}
                        </label>
                        <div className="flex items-center">
                          {" "}
                          <input
                            type="text"
                            name={`address-${index}`}
                            value={addr.value}
                            onChange={(e) => handleChange(e, index)}
                            className={`w-full h-[40px] px-[10px] border rounded-[4px] text-[14px] ${
                              errors.address[index]
                                ? "border-red-500"
                                : "border-[#C8CBD0]"
                            }`}
                          />
                        </div>
                        {formData.address.length > 1 && (
                          <div
                            className="flex items-center gap-[10px] mt-[10px]"
                            onClick={() => removeAddress(addr.id)}
                          >
                            <DeleteSVG /> <span>Удалить</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAddress}
                    className="w-full h-[50px] bg-[#FE9015] text-white rounded-[4px] text-[16px] font-medium hover:bg-[#E88214] transition-colors mt-[20px]"
                  >
                    Добавить еще адрес
                  </button>
                </div>
              )}
              {activeTab === "history" && (
                <HistorySection
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ProfileComponent;
