import app from "./app.js";
import { connectDatabase } from "./config/database.js";



connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT : ${process.env.PORT}`)
}) 