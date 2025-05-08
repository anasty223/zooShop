// components/LocationSelector.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Импортируем debounce
import { FaMapPin } from "react-icons/fa";
import { fontSize } from "@/style/fontSize";

const LocationSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Функция для запроса городов с debounce
  const fetchCities = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setCities([]);
        return;
      }
  
      try {
        const response = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          {
            params: {
              namePrefix: query,
              limit: 10,
              sort: "-population",
            },
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        type City = { name: string };
        const cityNames = response.data.data.map((city: City) => city.name);
        setCities(cityNames);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
          setError("Превышен лимит запросов. Пожалуйста, подождите и попробуйте снова.");
        } else {
          setError("Ошибка при загрузке списка городов.");
        }
        console.error("API error:", (err as Error).message);
      }
    }, 500),
    []
  );
  

  // Вызываем fetchCities при изменении searchQuery
  useEffect(() => {
    fetchCities(searchQuery);

    return () => {
      fetchCities.cancel(); // Отменяем debounce при размонтировании
    };
  }, [searchQuery]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery("");
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleManualCitySubmit = () => {
    if (searchQuery.trim()) {
      setSelectedCity(searchQuery);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-black hover:text-gray-600 cursor-pointer focus:outline-none"
      >
        <FaMapPin className="text-orange-500 h-5 w-5" />
        <span className={fontSize.medium_16}>
          {selectedCity || "Выбрать город"}
        </span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <div className="px-4 py-2 border-b">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите город..."
              className="w-full outline-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleManualCitySubmit();
                }
              }}
            />
          </div>
          {error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : cities.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {cities.map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className={fontSize.medium}>{city}</span>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="px-4 py-2">Города не найдены</div>
          ) : (
            <div className="px-4 py-2">Начните вводить город...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;