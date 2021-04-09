const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../../middleware/async');
const SastService = require('../services/sastService');
const sastService = new SastService();
const debug = require('debug')('app:sonarController');

router.post('/metricsData/:traceId', asyncMiddleware(async (req, res) => {
    let traceId = req.params.traceId;
    let projectName = req.body.projectName;
    let projectKey = req.body.projectKey;
    let projectVersion = req.body.projectVersion;
    let dataMetrics = await sastService.main(traceId,projectName, projectKey, projectVersion);
    debug("dataMetrics :: ", JSON.stringify(dataMetrics));
    res.send(dataMetrics);

}));

module.exports = router;