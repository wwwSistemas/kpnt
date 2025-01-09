const express = require('express');
const { getClubs, createClub, updateClub, toggleClubStatus } = require('../controllers/clubController');
const router = express.Router();
const db = require('../models/db');

// Listar todos los clubes
router.get('/', getClubs);

// Crear un nuevo club
router.post('/', createClub);

// Actualizar un club
router.put('/:id', updateClub);

// Activar/desactivar un club
router.patch('/:id/toggle-status', toggleClubStatus);
 // Crear club

// Ruta para obtener un club por ID
router.get('/:id', async (req, res) => {
    const clubId = req.params.id;
    try {
        const [club] = await db.query('SELECT * FROM clubs WHERE club_id = ?', [clubId]);
        if (club.length === 0) {
            return res.status(404).json({ error: 'Club no encontrado' });
        }
        res.json(club[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener club' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [clubs] = await db.query('SELECT DISTINCT id, clubname, state FROM clubs');
        res.json({ clubs });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clubes' });
    }
});


module.exports = router;
