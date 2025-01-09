const db = require('../models/db');

exports.createIngreso = async (req, res) => {
    const { no_camaras, precio_camara, monto_cargo, fecha, club_id, numero_de_meses} = req.body;
    try {
        // Validación básica
        if (!no_camaras || !precio_camara || !monto_cargo || !fecha || !club_id || !numero_de_meses) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Inserta en la tabla `ingresos_club`
        const result = await db.query(
            'INSERT INTO ingresos_club (no_camaras, precio_camara, monto_cargo, fecha, club_id, numero_de_meses) VALUES (?, ?, ?, ?, ?, ?)',
            [no_camaras, precio_camara, monto_cargo, fecha, club_id, numero_de_meses]
        );

        res.status(201).json({
            message: 'Ingreso creado exitosamente',
            id: result[0].insertId,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ingreso', details: error.message });
    }
};

exports.getIngresosByClub = async (req, res) => {
    const { clubId } = req.params;

    try {
        const [rows] = await db.query(
            'SELECT id, no_camaras, precio_camara, monto_cargo, fecha FROM ingresos_club WHERE club_id = ?',
            [clubId]
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los ingresos', details: error.message });
    }
};

exports.getRecentIngresos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT id, no_camaras, monto_cargo, fecha 
            FROM ingresos_club 
            ORDER BY fecha DESC 
            LIMIT 10
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los ingresos recientes', details: error.message });
    }
};
