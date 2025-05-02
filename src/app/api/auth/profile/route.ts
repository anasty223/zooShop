import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Путь к prisma
import { verifyToken } from '../../../../../src/middleware'; // Путь к middleware

export async function GET(req: Request) {
  try {
    // Проверяем токен
    const decoded = verifyToken(req);
    
    // Если токен невалидный, сразу вернется ошибка из middleware
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Не удалось авторизоваться' }, { status: 401 });
    }

    // Ищем пользователя по ID, который мы получили из декодированного токена
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, created_at: true }, // Возвращаем только нужные поля
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Ошибка при получении профиля', error);
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}
