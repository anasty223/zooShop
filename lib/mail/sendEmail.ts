import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationCode = async (email: string, code: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Ваш код подтверждения",
    text: `Ваш код: ${code}`,
    html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
  })

  console.log("Сообщение отправлено:", info.messageId)
}
