const express = require('express');
const db = require('../models/db');
const router = express.Router();

const { createIngreso, getIngresosByClub, getRecentIngresos } = require('../controllers/ingresoController');

// Ruta para obtener ingresos por club
router.get('/:clubId', getIngresosByClub);

// Ruta para crear un ingreso
router.post('/', createIngreso);

router.get('/recent', getRecentIngresos);

module.exports = router;
