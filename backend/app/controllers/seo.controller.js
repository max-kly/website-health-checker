const { checkSeo } = require('../models/seo.model')

const seoController = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send({ error: 'Missing url parameter' });
    }
    const seoAudit = await checkSeo(url)
    return res.status(200).send(seoAudit)
}
module.exports = { seoController }