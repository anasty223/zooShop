import React, { useState } from 'react';
import { fontSize } from '@/style/fontSize';
import { useRouter } from 'next/navigation';

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [codeIsSend, setIsCodeSend] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']); // Состояние для 6-значного кода
  const [codeError, setCodeError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Введите корректный email');
    } else {
      setError('');
    }
  };

  const sendCode = async () => {
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setIsCodeSend(true);
      } else {
        throw new Error(data.error || 'Ошибка при отправке');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setCodeError('Введите полный 6-значный код');
      return;
    }
  
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: fullCode }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        console.log('Код подтверждён', data);
        
        // Сохраняем токен в localStorage (или в куки)
        localStorage.setItem('token', data.token); // Можно также использовать cookies
  
        alert('Код успешно подтверждён!');
        // Переход в личный кабинет
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Неверный код');
      }
    } catch (err) {
      setCodeError(err.message);
    }
  };
  

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setCodeError(''); // Сбрасываем ошибку при изменении

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
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
          error ? 'border-red-500' : 'border-[#C8CBD0]'
        }`}
        placeholder="Введите ваш емейл"
        disabled={codeIsSend} // Блокируем поле после отправки кода
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!codeIsSend && (
        <button
          onClick={sendCode}
          className={`${fontSize.medium_16} bg-[#FE9015] text-white rounded-sm w-full h-[50px] mt-[20px] cursor-pointer`}
        >
          Получить код
        </button>
      )}
      {codeIsSend && (
        <>
          <p className="text-green-500 text-sm">Код отправлен на ваш email</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(e.target.value, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !code[index] && index > 0) {
                    document.getElementById(`code-input-${index - 1}`).focus();
                  }
                }}
                id={`code-input-${index}`}
                className={`w-[40px] h-[40px] text-center text-[16px] border rounded-md ${
                  codeError ? 'border-red-500' : 'border-[#C8CBD0]'
                }`}
              />
            ))}
          </div>
          {codeError && <p className="text-red-500 text-sm mt-[10px]">{codeError}</p>}
          <button
            onClick={verifyCode}
            className={`${fontSize.medium_16} bg-[#FE9015] text-white rounded-sm w-full h-[50px] mt-[20px] cursor-pointer`}
          >
            Подтвердить код
          </button>
        </>
      )}
    </div>
  );
};

export default Login;