const db = require('../models/db');

// Controlador para crear una nueva cámara
exports.createCamera = async (req, res) => {
    const { name, club_id } = req.body;

    try {
        if (!name || !club_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Inserta la cámara en la tabla `canchas_clubes`
        const result = await db.query(
            'INSERT INTO canchas_clubes (namefield, club_id) VALUES (?, ?)',
            [name, club_id]
        );

        res.status(201).json({
            message: 'Cámara creada exitosamente',
            id: result[0].insertId,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cámara', details: error.message });
    }
};

exports.getCamerasByClub = async (req, res) => {
    const { clubId } = req.params;
    try {
        const [rows] = await db.query('SELECT id, namefield FROM canchas_clubes WHERE club_id = ?', [clubId]);
        res.status(200).json(rows); // Envía las cámaras como JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cámaras', details: error.message });
    }
};