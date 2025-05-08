import { NextResponse ,NextRequest } from 'next/server';

export function middleware(req:NextRequest) {
  // Логика твоего middleware
  const token = req.cookies.get('token'); // Пример получения токена из cookies
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Если нет токена, редирект на страницу входа
  }

  return NextResponse.next(); // Если токен есть, продолжаем выполнение запроса
}

export const config = {
  matcher: ['/dashboard', '/profile'], // Указываем, какие страницы будут использовать middleware
};
