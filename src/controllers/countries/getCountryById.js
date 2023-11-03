const { Country } = require('../../db')

// función para obtener un país según su ID
async function getCountryById(req, res) {
    try {
        // extraemos el id pasado por params
        // luego nos aseguramos de manejar solo mayúsculas porque así está el ID en la base de datos
        let { id } = req.params;
        if (!id) throw Error('Faltan datos');
        id = id.toUpperCase();
        const country = await Country.findOne({ where: { ID: id } });
        if (!country) throw Error("país no encontrado");
        res.json(country);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = getCountryById;
