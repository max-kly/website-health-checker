const express = require('express');
const cors = require('cors');
const { healthController } = require('./controllers/health.controller');
const { seoController } = require('./controllers/seo.controller');
const app = express();
app.use(cors());
app.get('/check-status', healthController);
app.get('/check-seo', seoController);
app.get('/test', (req, res) => {
    res.status(200).send('Test OK');
});

const PORT = 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
