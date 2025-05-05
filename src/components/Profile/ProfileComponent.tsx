"use client"
import React, { useState } from 'react';
import { MainWrapper } from '../ui/MainWrapper';

const ProfileComponent = () => {
  const [formData, setFormData] = useState({
    name: 'Николай',
    address: '',
    orderSource: '',
    password: '',
    phone: '+7 (912) 345 67 89',
    email: 'myname@mail.ru',
  });

  const [errors, setErrors] = useState({
    address: '',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'address' && !value.trim()) {
      setErrors((prev) => ({ ...prev, address: 'Укажите адрес доставки' }));
    } else {
      setErrors((prev) => ({ ...prev, address: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.address.trim()) {
      setErrors((prev) => ({ ...prev, address: 'Укажите адрес доставки' }));
      return;
    }
    console.log('Form submitted:', formData);
  };

  const tabs = [
    { id: 'profile', label: 'Личный кабинет' },
    { id: 'orders', label: 'Заказы' },
    { id: 'settings', label: 'Настройки' },
  ];

  return (
    <MainWrapper customOuter="pt-[50px]">
      <div className="flex">
        {/* Табы слева */}
        <div className="w-[200px] p-[20px]">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer p-[10px] text-[14px] rounded-[4px] mb-[10px] ${
                activeTab === tab.id
                  ? 'bg-white text-[#FE9015] font-medium'
                  : 'text-[#848992] hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Контент формы */}
        <div className="flex-1 p-[20px]">
          {activeTab === 'profile' && (
            <>
              <h1 className="text-[36px] font-bold">Личный кабинет</h1>
              <form onSubmit={handleSubmit} className="mt-[30px] max-w-[400px]">
                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">
                    Адрес доставки{' '}
                    {errors.address && (
                      <span className="text-red-500 text-[12px]">{errors.address}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full h-[40px] px-[10px] border rounded-[4px] text-[14px] ${
                      errors.address ? 'border-red-500' : 'border-[#C8CBD0]'
                    }`}
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">Источник заказа</label>
                  <input
                    type="text"
                    name="orderSource"
                    value={formData.orderSource}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">Смена пароля</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[50px] bg-[#FE9015] text-white rounded-[4px] text-[16px] font-medium hover:bg-[#E88214] transition-colors"
                >
                  Сохранить
                </button>
              </form>
            </>
          )}
          {activeTab === 'orders' && <div className="text-[16px]">Список заказов будет здесь</div>}
          {activeTab === 'settings' && <div className="text-[16px]">Настройки будут здесь</div>}
        </div>
      </div>
    </MainWrapper>
  );
};

export default ProfileComponent;