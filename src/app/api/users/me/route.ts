import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
     // extract data from tokens 
    const userId =  await GetDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    if(!user) {
        return NextResponse.json(
            {error: " Invalid tokens "},
            {status: 400})
    }

    return NextResponse.json({
        message: "User Found",
        data: user
    })
    
  } catch (error:any) {
         return NextResponse.json(
                    {error: error.messsage},
                    {status: 500})
  }
}
