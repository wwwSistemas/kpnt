const express = require('express');
const { getStats, getActiveClubs, getRecentIngresos } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/stats', getStats);
router.get('/active-clubs', getActiveClubs);
router.get('/recent-ingresos', getRecentIngresos);

module.exports = router;