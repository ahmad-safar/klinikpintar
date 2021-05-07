import { Router } from 'express'
import { db } from '../config/db'

const router = Router()

// TODO split to separate module
// TODO what's the bug in this method and how to fix it?
router.get('/init', async (req, res) => {
    // TODO normalize database
    await db.query(`CREATE TABLE IF NOT EXISTS disease(
        id              INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name            VARCHAR(50),
        picture         VARCHAR(50),
        patient_id      INT(11)
    )`)

    await db.query(`CREATE TABLE IF NOT EXISTS patient(
        id              INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name            VARCHAR(50),
        age             int(11)
    )`)

    const [rows] = await db.query(`SELECT * FROM disease`)
    res.send(rows)
    // TODO sample database join?
})

export default router
