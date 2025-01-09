const db = require('../models/db');

exports.getStats = async (req, res) => {
    try {
        const [[stats]] = await db.query(`
            SELECT
                (SELECT COUNT(*) FROM clubs WHERE is_active = 1) AS active_clubs,
                (SELECT COUNT(*) FROM clubs WHERE is_active = 0) AS inactive_clubs,
                (SELECT COUNT(*) FROM canchas_clubes) AS total_canchas,
                (SELECT COUNT(*) FROM videos) AS total_videos
        `);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getActiveClubs = async (req, res) => {
    try {
        const [clubs] = await db.query(`
            SELECT clubname, active_until FROM clubs WHERE is_active = 1 ORDER BY active_until ASC
        `);
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecentIngresos = async (req, res) => {
    try {
        const [ingresos] = await db.query(`
            SELECT club_id, monto_cargo, fecha FROM ingresos_club ORDER BY fecha DESC LIMIT 10
        `);
        res.json(ingresos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};