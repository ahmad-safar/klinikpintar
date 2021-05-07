import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import initRoutes from './api/init'
import diseaseRoutes from './api/disease'

import {app} from './app'

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(initRoutes)
app.use(diseaseRoutes)

// TODO how do you debug typescript code?
app.listen(3001, () => {
    console.log('App is running')
})

// TODO create dockerfile
// TODO create docker-compose file
// TODO set CI/CD for the repository
// TODO create unit test