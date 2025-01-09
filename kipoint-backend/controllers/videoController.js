// videoController.js
const pool = require('../models/db');


// Obtener videos filtrados


const getFilteredVideos = async (req, res) => {
    const { clubId, date, timeRange } = req.query;
    let query = `
        SELECT videos.id, videos.videoname, videos.created_at, clubs.clubname
        FROM videos
        JOIN clubs ON videos.club_id = clubs.club_id
        WHERE 1=1`;

    const params = [];

    if (clubId) {
        query += ' AND videos.club_id = ?';
        params.push(clubId);
    }
    if (date) {
        query += ' AND DATE(videos.created_at) = ?';
        params.push(date);
    }
    if (timeRange) {
        const [start, end] = timeRange.split('-');
        query += ' AND TIME(videos.created_at) BETWEEN ? AND ?';
        params.push(`${start}:00:00`, `${end}:59:59`);
    }

    try {
        const [videos] = await pool.query(query, params);
        res.json({ videos });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Error al obtener videos' });
    }
};

// Obtener rangos de horario
const getTimeRanges = async (req, res) => {
    const { clubId, date } = req.query;

    if (!clubId || !date) {
        return res.status(400).json({ error: 'clubId y date son requeridos' });
    }

    try {
        const query = `
            SELECT DISTINCT HOUR(videos.created_at) AS hour
            FROM videos
            WHERE videos.club_id = ? AND DATE(videos.created_at) = ?
            ORDER BY hour`;
        const params = [clubId, date];

        const [results] = await pool.query(query, params);
        const ranges = results.map(row => `${row.hour}:00-${row.hour + 1}:00`);

        res.json({ ranges });
    } catch (error) {
        console.error('Error fetching time ranges:', error);
        res.status(500).json({ error: 'Error al obtener rangos de horario' });
    }
};

module.exports = { getFilteredVideos, getTimeRanges };
