import  express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Importing & Using Routes
import usersRoute from './routes/userRoutes.js'
import { ErrorMiddleware } from "./middleware/Error.js";
import { config } from "dotenv";

config({path:"./config/config.env"});


app.use("/api/v1",usersRoute)





// using this middleware always in last 
app.use(ErrorMiddleware)
export default app;