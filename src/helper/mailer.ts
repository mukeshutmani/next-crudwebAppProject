import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"


export const sendEmail = async ({email, emailType, userId}:any) => {
      try {
        
        const hashToken = await bcrypt.hash(userId.toString(), 10)
        
        if(emailType === "VERIFY") {

          // by default behviour of mongoose 
            await User.findByIdAndUpdate(userId, 
            { $set: {
                verifyToken: hashToken, 
                verifyTokenExpiry:  Date.now() + 3600000
              } }
            )  
        }  else if(emailType === "RESET") {
          await User.findByIdAndUpdate(userId, 
          { $set: {
              forgotPasswordToken: hashToken, 
              forgotPasswordTokenExpiry: Date.now() + 3600000
            }}
            
          )  
        }
         
        // Looking to send emails in production? Check out our Email API/SMTP product!
              const transporter = nodemailer.createTransport({
                  host: "sandbox.smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                    user: "a991895ee5955b", // ❌
                    pass: "96782a21bcbd76"  // ❌
                  }
                });
          
          const mailOptions = {
            from: 'mukesh@mukesh.ai', 
            to: email, 
            subject: emailType === 'VERIFY' ? 'Verify your email': 'Reset Your Password',
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}"> here </a> to 
            ${emailType==="VERIFY"? "verify your email": "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
           </p>`, // html body
          }

          // todo for forget password

         const mailRes = await transporter.sendMail(mailOptions);

         return mailRes;


      } catch (error:any) {
         throw new Error(error.message)
      }
}