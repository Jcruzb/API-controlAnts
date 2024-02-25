const nodemailer = require("nodemailer");
const email = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// Registrar eventos del transportador
transporter.on("error", (err) => {
  console.error("Error en el transporte:", err);
});

transporter.on("sent", (info) => {
  console.log("Correo electrónico enviado:", info.response);
});

module.exports.sendValidationEmail = (user) => {
  console.log("user ID is: " + user.id);
  transporter
    .sendMail({
      from: `"Control Ants" <${email}>`,
      to: user.email,
      subject: "Bienvenido a Control Ants",
      html: `
        <h1>Bienvenido a ControlAnts</h1>
        <p>Activa tu cuenta en el siguiente enlace</p>
        <a href="${process.env.APP_HOST}/users/${user.id}/activate">Click aquí</a>
      `,
    })
    .then(() => {
      console.log(`email sent to ${user.email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};

