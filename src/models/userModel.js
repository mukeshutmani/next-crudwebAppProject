import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({

      username: {
        type: String,
        required: [true, "please provide a username"],
        unique: true
      },

      email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true
      },

      password: {
        type: String,
        required: [true, "please provide a password"],
      },
      
      isVerified: {
        type: boolean,
        default: false
      },


      isAdmin: {
        type: boolean,
        default: false
      },

      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,

      verifyToken: String,
      verifyTokenExpiry: Date

      


}, {timestamps: true})


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User

