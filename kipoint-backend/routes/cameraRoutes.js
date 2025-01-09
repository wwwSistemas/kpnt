const express = require('express');
const router = express.Router();
const {getCamerasByClub, createCamera } = require('../controllers/cameraController');

router.get('/:clubId', getCamerasByClub);
// Ruta para crear una cámara
router.post('/', createCamera);


module.exports = router;
