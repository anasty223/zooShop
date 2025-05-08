// src/app/api/profile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Нет токена' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Неверный токен' }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Нет токена' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const body = await req.json();
    const { name, phone, address } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { profile: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: decoded.id },
      update: { name, phone, address },
      create: {
        userId: decoded.id,
        name,
        phone,
        address,
      },
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка при обновлении профиля' }, { status: 500 });
  }
}


