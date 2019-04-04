const nodemailer = require("nodemailer")

async function getTransporter() {
  let account = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  })
}

// Send host a notification
async function sendVisitNotification(visitorName = "Persona 1", host = "alexis.leon@ironbit.com.mx") {
  let mailOptions = {
    from: '"Recepción Ironbit 💻" <no-reply@ironbit.com.mx>',
    to: host,
    subject: `${visitorName} te está esperando en recepción - Recepción`, // Subject line
    // text: "This is an autogenerated email.", // plain text body
    html: `<b>${visitorName}</b> is waiting for you.` // html body
  }

  let transporter = getTransporter()
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId)
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = {
  sendVisitNotification,
}