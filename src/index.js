import dotenv from "dotenv"
import { app } from "./app.js"
import { prisma } from "./db/db.js"
import { date } from "./UTILS/TimeDate.js"


dotenv.config({
    path: './.env'
})


// const user = await prisma.user.create({
//     data: {
//         email:"santanugote82@gmail.com",
//         name:"shantanu gote",    
//         password:"123456",
       
//     },
//   })































































































