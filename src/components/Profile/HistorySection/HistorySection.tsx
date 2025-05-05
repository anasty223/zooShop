import { fontSize } from "@/style/fontSize";
import React, { useState } from "react";



const HistorySection = () => {
  const [openOrderIndex, setOpenOrderIndex] = useState<number | null>(null); 

 
  const orders = [
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "В обработке",
      amount: "3 товара 3651 Р",
      order: [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 2000 },
        { id: 3, name: "Товар 3", price: 3000 },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 2000 },
        { id: 3, name: "Товар 3", price: 3000 },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "Отменен",
      amount: "3 товара 3651 Р",
      order: [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 2000 },
        { id: 3, name: "Товар 3", price: 3000 },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 2000 },
        { id: 3, name: "Товар 3", price: 3000 },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 2000 },
        { id: 3, name: "Товар 3", price: 3000 },
      ],
    },
  ];

  const getStatusColor = (status:string) => {
    switch (status) {
      case "В обработке":
        return "text-red-500";
      case "Доставлен":
        return "text-green-500";
      case "Отменен":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  const toggleOrder = (index: number) => {
    setOpenOrderIndex(openOrderIndex === index ? null : index); 
  };

  return (
    <div className="w-full">
      {orders.map((order, index) => (
        <div key={index} className="border-b border-[#C8CBD0] py-[10px]">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleOrder(index)}
          >
            <div className="flex items-center gap-[20px]">
             
              <div>
                <p className={`${fontSize.bold_20}`}>Заказ от: {order.date}</p>
                <p className="text-[#848992] text-[14px]">
                  Номер заказа: {order.number}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`${getStatusColor(
                  order.status
                )} text-[14px] font-medium`}
              >
                {order.status}
              </p>
              <p className="text-[#848992] text-[14px]">{order.amount}</p>
            </div>
          </div>
          {openOrderIndex === index && (
            <div className="mt-[10px] pl-[40px]">
              {order.order.map((item) => (
                <div key={item.id} className="flex justify-between py-[5px]">
                  <p className="text-[#848992] text-[14px]">{item.name}</p>
                  <p className="text-[#848992] text-[14px]">{item.price} Р</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistorySection;