import React, { useState } from "react";
import { fontSize } from "@/style/fontSize";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [codeIsSend, setIsCodeSend] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Состояние для 6-значного кода
  const [codeError, setCodeError] = useState("");
  const [firstLogin, setIsFirstLogin] = useState(true);
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Введите корректный email");
    } else {
      setError("");
    }
  };

  const sendCode = async () => {
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setIsCodeSend(true);
      } else {
        throw new Error(data.error || "Ошибка при отправке");
      }
    } catch (err) {
      if (err instanceof Error) {
        setCodeError(err.message);
      } else {
        setCodeError("An unknown error occurred");
      }
    }
  };

  const verifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setCodeError("Введите полный 6-значный код");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await res.json();

      if (data.success) {
        document.cookie = `token=${data.token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; SameSite=Strict; Secure`;

        localStorage.setItem("token", data.token);

        if (firstLogin) {
          router.push("/profile");
        } else router.push("/dashboard");
      } else {
        throw new Error(data.error || "Неверный код");
      }
    } catch (err) {
      if (err instanceof Error) {
        setCodeError(err.message);
      } else {
        setCodeError("An unknown error occurred");
      }
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setCodeError(""); // Сбрасываем ошибку при изменении

    if (value && index < 5) {
      const inputElement = document.getElementById(`code-input-${index + 1}`);
      if (inputElement) {
        inputElement.focus();
      }
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
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(e.target.value, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[index] && index > 0) {
                    const previousInput = document.getElementById(
                      `code-input-${index - 1}`
                    );
                    if (previousInput) {
                      previousInput.focus();
                    }
                  }
                }}
                id={`code-input-${index}`}
                className={`w-[40px] h-[40px] text-center text-[16px] border rounded-md ${
                  codeError ? "border-red-500" : "border-[#C8CBD0]"
                }`}
              />
            ))}
          </div>
          {codeError && (
            <p className="text-red-500 text-sm mt-[10px]">{codeError}</p>
          )}
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
