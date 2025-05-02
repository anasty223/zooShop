import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createOrUpdateUser(email: string, code: string) {
  return await prisma.user.upsert({
    where: { email },
    update: { code },
    create: { email, code },
  })
}
