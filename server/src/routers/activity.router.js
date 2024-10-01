const { Router } = require('express');
const { getAllActivities, postNewActivity } = require('@controllers/activity.controller');

const activityRouter = Router();

activityRouter.get('/', getAllActivities);

activityRouter.post('/', postNewActivity);

module.exports = activityRouter;