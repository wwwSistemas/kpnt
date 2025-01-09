const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Ruta para obtener videos filtrados
router.get('/videos', videoController.getFilteredVideos);

// Ruta para obtener rangos de horario
router.get('/time-ranges', videoController.getTimeRanges);

// Ruta para obtener filtros (clubes)
router.get('/filters', async (req, res) => {
    try {
        const [clubs] = await pool.query('SELECT club_id, clubname FROM clubs');
        res.json({ clubs });
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Error al obtener filtros' });
    }
});

module.exports = router;
