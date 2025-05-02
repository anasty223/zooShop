import { NextResponse } from 'next/server'
import { sendVerificationCode } from '../../../../../lib/mail/sendEmail' // вот здесь

export async function POST(req: Request) {
  const { email } = await req.json()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Неверный email' }, { status: 400 })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()

  try {
    await sendVerificationCode(email, code) // вот здесь вызываем
    console.log(`Отправлен код ${code} для ${email}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Ошибка при отправке письма", err)
    return NextResponse.json({ error: 'Ошибка при отправке письма' }, { status: 500 })
  }
}
