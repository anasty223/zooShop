import React from 'react'

type Props = {
    formData: {
        name: string;
        address: string;
        orderSource: string;
        password: string;
        phone: string;
        email: string;
    };
    errors: {
        address: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileSection = ({formData,  handleChange}:Props) => {
  return (
   <div>
                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">
                    Имя
                  </label>
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
                    Смена пароля
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
                  />
                </div>

                <div className="mb-[20px]">
                  <label className="text-[#848992] text-[14px] mb-[5px] block">
                    Email
                  </label>
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
                </div>
             
  )
}

export default ProfileSection