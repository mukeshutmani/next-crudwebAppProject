import mongoose from "mongoose";


export async function connect() {
    try {
         
       mongoose.connect(process.env.MONGODB_URL !)
       const connection = mongoose.connection

       connection.on('connected', () => {
          console.log("MongoDB Connected");
          
       })

       connection.on("error", (error) => {
          console.log("MongoDb Connection error, please make sure database is up and running", error);

          process.exit(1)
       })

    } catch (error) {
        console.log("Something went wrong while db connection");
    }
}