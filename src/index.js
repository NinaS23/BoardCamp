import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import  categoriesRouter from "./routes/categoriesRoute.js";
import gamesRouter from "./routes/gamesRoute.js";

dotenv.config()


const server = express()
server.use(json())
server.use(cors())

server.use(categoriesRouter)
server.use(gamesRouter)


const PORT= process.env.PORT || 5000
server.listen(4000 ,()=>{
    console.log(`subiu a porta ${PORT} 
    `)
})  