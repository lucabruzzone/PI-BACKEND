const { Activity } = require('../../db');

// función para obtener la lista completa de actividades
async function getAllCountries(req, res) {
    try {
        const data = await Activity.findAll();
        if (!data.length) throw Error('Error al cargar la lista de actividades');
        res.json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = getAllCountries;
