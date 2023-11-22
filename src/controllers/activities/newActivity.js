const { Country, Activity } = require('../../db');

async function newActivity(req, res) {
    try {
        const { nombre, dificultad, duracion, temporada, paises } = req.body;
        if (!nombre || !dificultad || !duracion || !temporada || !paises.length) {
            throw Error('Faltan datos');
        }
        const temporadaLowerCase = temporada.toLowerCase();
        const nombreLowerCase = nombre.toLowerCase();
        const paisesRelacionados = await Country.findAll({ where: { nombre: paises } });
        const activity = await Activity.findOne({
            where: {
                nombre: nombreLowerCase,
                dificultad,
                duracion,
                temporada: temporadaLowerCase
            }
        });
        if (activity) {
            // si ya existe la actividad, entonces solo actualizamos los países que el usuario quiere que tengan esta actividad.
            // con addCountries agregamos esta actividad a nuevos países, y si los países seleccionados ya tenían esta actividad, no habrá ningún cambio.
            const setActivity = await activity.addCountries(paisesRelacionados);
            res.status(201).json(setActivity);
        }
        else {
            // en el caso de que no exista la actividad, se crea en la BD y se setea con los países seleccionados.
            const newAct = await Activity.create({
                nombre: nombreLowerCase,
                dificultad,
                duracion,
                temporada: temporadaLowerCase
            });
            const setActivity = await newAct.setCountries(paisesRelacionados);
            res.status(201).json(setActivity);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = newActivity;
