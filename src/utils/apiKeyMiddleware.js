require("dotenv").config();
const { API_KEY } = process.env;

function apiKeyMiddleware(req, res, next) {
    const { apiKey } = req.query;
    if (apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: 'Acceso no autorizado' });
    }
}

module.exports = apiKeyMiddleware;
