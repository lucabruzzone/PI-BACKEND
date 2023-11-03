const { Activity } = require('../../db');

// función para eliminar una actividades de la base de datos
async function deleteActivity(req, res) {
    try {
        const { id } = req.params;
        if (!id) throw Error('Faltan datos');
        Activity.destroy({
            where: {
                ID: id
            }
        });
        res.status(201).json('Actividad eliminada');
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = deleteActivity;
