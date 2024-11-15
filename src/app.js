import express from 'express'













const app = express()
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  export {app}


  import USerrouter from './routes/user.route.js'

app.use ("/users",USerrouter)