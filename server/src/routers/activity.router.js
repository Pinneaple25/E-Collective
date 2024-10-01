const { Router } = require('express');
const { httpGetAllActivities } = require('@controllers/activity.controller');

const activityRouter = Router();

activityRouter.get('/', httpGetAllActivities);

module.exports = activityRouter;