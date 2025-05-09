"use client"
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import { fontSize } from '@/style/fontSize'



const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="max-w-[271px] mx-auto mt-[54px]  bg-white rounded-md  ">
      <div className="flex justify-center  mb-4 ">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 mx-1 border-b-[4px] ${
            isLogin ? `${fontSize.bold} border-black text-black `:  `border-transparent ${fontSize.medium_24} `
          }`}
        >
          Вход
        </button>
   
      </div>

      <div className="">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  )
}

export default AuthPage
