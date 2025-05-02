import { NextResponse } from 'next/server'
import { sendVerificationCode } from '../../../../../lib/mail/sendEmail'
import { createOrUpdateUser } from '../../../../../lib/user' // ← подключили

export async function POST(req: Request) {
  const { email } = await req.json()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Неверный email' }, { status: 400 })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()

  try {
    // 1. Сохраняем в базу
    await createOrUpdateUser(email, code)

    // 2. Отправляем код
    await sendVerificationCode(email, code)

    console.log(`Отправлен код ${code} для ${email}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Ошибка при отправке письма или сохранении", err)
    return NextResponse.json({ error: 'Ошибка при отправке' }, { status: 500 })
  }
}