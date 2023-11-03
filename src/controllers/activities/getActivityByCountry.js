const { Country } = require('../../db');
const { Op } = require('sequelize');

// función para obtener la lista de actividades de un país
async function getActivityByCountry(req, res) {
    try {
        const { id } = req.params;
        const country = await Country.findOne({
            where: {
                ID: {
                    [Op.iLike]: id,
                },
            },
        });
        if (!country) {
            return res.status(404).json({ error: 'País no encontrado' });
        }
        const activities = await country.getActivities();
        res.json({ country, activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getActivityByCountry;
