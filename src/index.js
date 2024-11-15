import dotenv from "dotenv"
import { app } from "./app.js"
import { prisma } from "./db/db.js"
import { date } from "./UTILS/TimeDate.js"


dotenv.config({
    path: './.env'
})



const user = await prisma.User.create({
    data: {
        name:'shantanu gote' ,
        email:'email@email.com',
        password:"shantanu",
        created_at:date
    

    }
  })































































































