"use client"
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

type Props = {}

const AuthPage = (props: Props) => {
    const [isLogin, setIsLogin] = useState(false)
    return (
      <div>
          {isLogin ? <Login/> : <Register/>}
      </div>
    )
}

export default AuthPage