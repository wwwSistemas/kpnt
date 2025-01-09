const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dashboardRoutes = require('./routes/dashboardRoutes');
const clubRoutes = require('./routes/clubRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const ingresoRoutes = require('./routes/ingresosRoutes');
const videoRoutes = require('./routes/videoRoutes');
const filtersRoutes = require('./routes/filterRoutes');
const path = require('path');



dotenv.config();
const app = express();

console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT
});

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Cambia según el servidor de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/clubs', clubRoutes); // Prefijo para rutas de clubes
app.use('/api/cameras', cameraRoutes); // Prefijo para rutas de cámaras
app.use('/api/ingresos', ingresoRoutes); // Prefijo para rutas de ingresos
app.use('/api/videos', videoRoutes);
app.use('/api/filters', filtersRoutes);
app.use('/videos', express.static(path.join(__dirname, '../videos')));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

