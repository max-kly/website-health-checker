const { checkHealth } = require("../models/health.model");

const healthController = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send({ error: 'Missing url parameter' });
    }
    const websiteHealth = await checkHealth(url);
    return res.status(200).send(websiteHealth);
};
module.exports = { healthController }