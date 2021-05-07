import { Router } from 'express'
import { db } from '../config/db'

const router = Router()

// TODO create CRUD sample
router.get('/diseases', async (req, res) => {
    const [rows] = await db.query(`
    SELECT
        disease.*,
        patient.NAME AS patient_name,
        patient.age AS patient_age 
    FROM
        disease
        LEFT JOIN patient ON disease.patient_id = patient.id
    `);
    res.send(rows)
});

router.post('/diseases', async (req, res) => {
    const { name, picture, patient_name, patient_age } = req.body;
    console.log(req.body);

    const [rows] = await db.query(`INSERT INTO patient VALUES(NULL, ?, ?)`, [patient_name, patient_age]);
    const patient: any = rows;

    await db.query(`INSERT INTO disease VALUES(NULL, ?, ?, ?)`, [name, picture, patient.insertId]);

    res.send({message: 'Disease successfully created.'})
});

router.put('/diseases/:diseaseId', async (req, res) => {
    const { diseaseId } = req.params;
    const { name, picture, patient_id, patient_name, patient_age } = req.body;

    await db.query(`UPDATE disease SET name = ?, picture = ? WHERE id = ?`, [name, picture, diseaseId]);
    await db.query(`UPDATE patient SET name = ?, age = ? WHERE id = ?`, [patient_name, patient_age, patient_id]);

    res.send({message: 'Disease successfully updated.'})
});

router.delete('/diseases/:diseaseId', async (req, res) => {
    const { diseaseId } = req.params;

    await db.execute(`DELETE FROM disease WHERE id = ?`, [diseaseId]);

    res.send({message: 'Disease successfully deleted.'})
});

export default router;
