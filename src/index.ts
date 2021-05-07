import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

// TODO change database?
import { db } from './config/db'

const app = express();

app.use(express.json())
app.use(express.static('public'))

// TODO how do you debug typescript code?
app.listen(9000, () => {
    console.log('App is running')
})

// TODO split to separate module
// TODO what's the bug in this method and how to fix it?
app.get('/init', async (req, res) => {
    // TODO normalize database
    db.run(`CREATE TABLE disease(
        name            text
        picture         text
        patient_name    text
        patient_age     int
    )`)

    db.all(`SELECT * FROM disease`, (err: any, data: any) => {
        res.send(data)
    })
    // TODO sample database join?
})

// TODO create CRUD sample
app.get('/diseases', (req, res) => {
    db.all(`SELECT * FROM disease`, (err: any, data: any) => {
        res.send(data)
    })
})
// TODO create dockerfile
// TODO create docker-compose file
// TODO set CI/CD for the repository
// TODO create unit test