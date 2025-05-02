// route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.code !== code) {
    return NextResponse.json({ error: 'Неверный код' }, { status: 401 });
  }

  // Создаем токен
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return NextResponse.json({ token });
}
