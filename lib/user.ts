import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createOrUpdateUser(email: string, code: string) {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { code },
      create: { email, code },
    })
    return user
  } catch (error) {
    console.error('Ошибка при создании или обновлении пользователя', error)
    throw new Error('Ошибка при работе с базой данных')
  }
}
