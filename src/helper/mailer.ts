import { verify } from "crypto";
import nodemailer from "nodemailer"


export const sentEmail = async ({email, emailType, userId}:any) => {
      try {
         // configure mail for usage  


        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          
          const mailOptions = {
            from: 'mukesh@mukesh.ai', 
            to: email, 
            subject: emailType === 'VERIFY' ? 'Verify your email': 'Reset Your Password',
            html: "<b>Hello world?</b>", // html body
          }

         const mailRes = await transporter.sendMail(mailOptions);

         return mailRes;


      } catch (error:any) {
         throw new Error(error.message)
      }
}