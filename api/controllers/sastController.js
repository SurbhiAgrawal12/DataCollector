const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../../middleware/async');
const SastService = require('../services/sastService');
const sastService = new SastService();
const debug = require('debug')('app:sonarController');

router.get('/metricsData', asyncMiddleware(async (req, res) => {
    let dataMetrics = await sastService.main();
    debug("dataMetrics :: ", JSON.stringify(dataMetrics));
    res.send(dataMetrics);

}));

module.exports = router;