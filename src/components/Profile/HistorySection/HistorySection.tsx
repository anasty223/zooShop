import { fontSize } from "@/style/fontSize";
import Image from "next/image";
import React, { useState } from "react";

import { OrderItem } from "@/types/types";
const HistorySection = () => {
  const [openOrderIndex, setOpenOrderIndex] = useState<number | null>(null);

  const orders = [
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "В обработке",
      amount: "3 товара 3651 Р",
      order: [
        {
          id: 1,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 2,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 3,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
      ],
      address: "г. Москва, ул. Ленина, д. 1",
      comment: "Укажите точный адрес доставки",
    },
    {
      date: "01/06/2020",
      address: "г. Москва, ул. Ленина, д. 1",
      comment: "Укажите точный адрес доставки",
      number: "№ 10662",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        {
          id: 1,
          name: "Товар 1",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 2,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 3,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      status: "Отменен",
      address: "г. Москва, ул. Ленина, д. 1",
      comment: "Укажите точный адрес доставки",
      amount: "3 товара 3651 Р",
      order: [
        {
          id: 1,
          name: "Товар 1",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 2,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 3,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
      ],
    },
    {
      date: "01/06/2020",
      address: "г. Москва, ул. Ленина, д. 1",
      comment: "Укажите точный адрес доставки",
      number: "№ 10662",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        {
          id: 1,
          name: "Товар 1",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 2,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 3,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
      ],
    },
    {
      date: "01/06/2020",
      number: "№ 10662",
      address: "г. Москва, ул. Ленина, д. 1",
      comment: "Укажите точный адрес доставки",
      status: "Доставлен",
      amount: "3 товара 3651 Р",
      order: [
        {
          id: 1,
          name: "Товар 1",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 2,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
        {
          id: 3,
          name: "Сухой корм Royal Canin Mini adult для собак мелких пород с 10 месяцев до 3 лет / Вес – 12 кг",
          price: 1000,
          image: "/images/history.png",
          count: 1,
          model: 33053,
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
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

  const calculateOrderTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
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
                <p className={`${fontSize.bold_20}`}>
                  Заказ от: {order.date} {order.number}
                </p>
                <p className="text-[#848992] text-[14px]">{order.amount}</p>
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
            </div>
          </div>
          {openOrderIndex === index && (
            <div className="mt-[10px] pl-[40px]">
              {order.order.map((item) => (
                <div key={item.id} className="flex gap-[10px] py-[5px]">
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.name}
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div className="flex-1 flex flex-col">
                    <p className="text-[#848992] text-[14px]">{item.name}</p>
                    <p className="text-[#848992] text-[14px]">
                      Модель: {item.model}
                    </p>
                    <p className="text-[#848992] text-[14px]">
                      {item.count} x {item.price} Р
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-[10px] text-right">
                <p className="text-[#848992] text-[14px] font-medium">
                  Итого: {calculateOrderTotal(order.order)} Р
                </p>
              </div>
              <div className="mt-[10px] text-right">
                <p className="text-[#848992] text-[14px] font-medium">
                  Адрес: {order.address}
                </p>
              </div>
                <div className="mt-[10px] text-right">
                    <p className="text-[#848992] text-[14px] font-medium">
                    Комментарий: {order.comment}
                    </p>
                </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistorySection;
