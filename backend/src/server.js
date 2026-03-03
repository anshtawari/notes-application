import express from "express"
import router from "./routs/notesRoutes.js"
import { conectDB } from "../config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config()

const app = express();



//middlewares
app.use(express.json());  //to parse json bodies res.body
app.use(cors({
    origin: 'http://localhost:5173', // Allow only frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))
app.use("/api/notes",router);
app.use(rateLimiter)

 

conectDB().then(()=>{
    app.listen(5001, ()=>{
    console.log("the server is started to PORT:5001 ");
})})