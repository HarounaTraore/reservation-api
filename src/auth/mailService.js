import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
  
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Votre code de réinitialisation de mot de passe',
    html: `
        <p>Votre code de recuperation est : <code style="font-weight: bold;  padding: 4px 10px; ">${otp}</code>. Il expirera dans 15 minutes.</p>
    `,
};


  await transporter.sendMail(mailOptions);
};
