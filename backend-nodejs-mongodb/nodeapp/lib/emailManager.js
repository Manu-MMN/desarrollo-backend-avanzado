//hacemos esto para implementar el invear por email el login y así comprobar la importancia de la inmediatez
import nodemailer from "nodemailer"

export async function createTransport() {
    const options = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
    }
}
return nodemailer.createTransport(options)

}

export function generatePreviewURL(sendResult) {
    return nodemailer.getTestMessageUrl(sendResult)
}