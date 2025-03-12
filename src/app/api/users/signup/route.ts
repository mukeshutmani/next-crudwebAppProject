import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helper/mailer"




connect()

export async function POST(request: NextRequest) {
      try {
       const reqBody = await request.json()

       const {username, email, password} =  reqBody;

       //validation
      //  console.log("req body ", reqBody);

      const user =  await User.findOne({email})
      
      // console.log("user", user);
      
      if(user) {
          return NextResponse.json({error: "user already exists"}, {status: 400})
       }

       const salt = await bcrypt.genSalt(10);
      //  console.log("salt:", salt);
       
       const hashPassword = await bcrypt.hash(password, salt)
       
      //  console.log("hash password", hashPassword)

      const newUser = new User({
        username,
        email,
        password: hashPassword
       })

       const savedUser = await newUser.save()

      //  console.log("user saved: ",savedUser);

       //    sendVerificationEmail
       await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

      return NextResponse.json(
        {
            message: "userRegisterd Succesfully",
            succes: true,
            savedUser
        }
      )

       

      } catch (error:any) {
         return NextResponse.json(
            {error: error.messsage},
            {status: 500})
      }
}
