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
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  
}

const HistorySection = ({formData, handleChange}: Props) => {
  return (
    <div className="mb-[20px]">
    <label className="text-[#848992] text-[14px] mb-[5px] block">
      Источник заказа
    </label>
    <input
      type="text"
      name="orderSource"
      value={formData.orderSource}
      onChange={handleChange}
      className="w-full h-[40px] px-[10px] border border-[#C8CBD0] rounded-[4px] text-[14px]"
    />
  </div>
  )
}

export default HistorySection