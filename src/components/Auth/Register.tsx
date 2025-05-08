"use client"
import React, { useState } from "react";
import { fontSize } from "@/style/fontSize";


const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Введите корректный email");
    } else {
      setError("");
    }
  };

  return (
    <div className="mt-[50px]">
      <div className={`${fontSize.medium} text-[#848992]`}>Ваш емейл</div>
      <input
        type="email"
        name="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validateEmail(e.target.value)}
        className={`border rounded-md w-full h-[50px] px-[10px] mt-[10px] mb-[10px] ${
          error ? "border-red-500" : "border-[#C8CBD0]"
        }`}
        placeholder="Введите ваш емейл"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className={`${fontSize.medium_16} bg-[#FE9015] text-white rounded-sm w-full h-[50px] mt-[20px]`}>Получить код </button>
    </div>
  );
};

export default Register;
