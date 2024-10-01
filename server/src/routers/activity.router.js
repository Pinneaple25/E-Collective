const { Router } = require('express');
const { httpGetAllActivities } = require('../controllers');

const activityRouter = Router();

activityRouter.get('/', httpGetAllActivities);

module.exports = activityRouter;