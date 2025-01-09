const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Obtiene clubes y estados únicos
        const [clubs] = await db.query('SELECT club_id, clubname FROM clubs');
        const [states] = await db.query('SELECT DISTINCT state FROM clubs');

        res.json({ clubs, states });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener filtros', details: error.message });
    }
});

module.exports = router;
