const axios = require('axios');

const checkHealth = async (url) => {
    const start = Date.now();
    try {
        const response = await axios.get(url, { timeout: 10000 });
        const responseTime = Date.now() - start;
        return {
            websiteStatus: {
                online: true,
                httpStatus: response.status,
                responseTimeMs: responseTime
            }
        };
    } catch (error) {
        return {
            websiteStatus: {
                online: false,
                httpStatus: error.response ? error.response.status : 'N/A',
                responseTimeMs: 'N/A'
            }
        };
    }
};
module.exports = { checkHealth }