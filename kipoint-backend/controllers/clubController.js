const db = require('../models/db');

// Obtener todos los clubes
exports.getClubs = async (req, res) => {
    try {
        const [clubs] = await db.query('SELECT * FROM clubs');
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo club
exports.createClub = async (req, res) => {
    const { clubname, phone_number, city, state, active_until } = req.body;
    try {
        await db.query('INSERT INTO clubs (clubname, phone_number, city, state, active_until) VALUES (?, ?, ?, ?, ?)', 
        [clubname, phone_number, city, state, active_until]);
        res.status(201).json({ message: 'Club creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un club
exports.updateClub = async (req, res) => {
    const { id } = req.params;
    const { clubname, phone_number, city, state, active_until } = req.body;
    try {
        await db.query('UPDATE clubs SET clubname = ?, phone_number = ?, city = ?, state = ?, active_until = ? WHERE club_id = ?', 
        [clubname, phone_number, city, state, active_until, id]);
        res.json({ message: 'Club actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const [club] = await db.query('SELECT * FROM clubs WHERE club_id = ?', [id]);
        res.json(club[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Activar/desactivar un club
exports.toggleClubStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE clubs SET is_active = NOT is_active WHERE club_id = ?', [id]);
        res.json({ message: 'Estado del club actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





