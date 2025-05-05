"use client";
import React, { useState } from "react";
import { MainWrapper } from "../ui/MainWrapper";
import { fontSize } from "../../style/fontSize";
import ProfileSection from "./ProfileSection/ProfileSection";

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
    address: string[];
  }>({
    address: [],
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    if (name.startsWith("address-")) {
      const newAddresses = [...formData.address];
      newAddresses[index].value = value;
      setFormData((prev) => ({ ...prev, address: newAddresses }));

      const newErrors = [...errors.address];
      newErrors[index] = value.trim() ? "" : "Укажите адрес доставки";
      setErrors((prev) => ({ ...prev, address: newErrors }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const removeAddress = (id: number) => {
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
            <form onSubmit={handleSubmit} className="">
              {activeTab === "profile" && (
                <ProfileSection
                  formData={formData}
                  handleChange={(e) => handleChange(e, 0)} 
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              )}
              {activeTab === "address" && (
                <div className="text-[16px] max-w-[400px]">
                  {formData.address.map((addr, index) => (
                    <div
                      key={addr.id}
                      className="mb-[20px] flex items-center gap-[10px]"
                    >
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
                            errors.address[index]
                              ? "border-red-500"
                              : "border-[#C8CBD0]"
                          }`}
                        />
                      </div>
                      {formData.address.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAddress(addr.id)}
                          className="w-[100px] h-[40px] bg-red-500 text-white rounded-[4px] text-[14px] hover:bg-red-600 transition-colors"
                        >
                          Удалить
                        </button>
                      )}
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