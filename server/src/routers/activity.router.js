const { Router } = require('express');
const { 
  getAllActivities,
  getActivity,
  postNewActivity,
} = require('@controllers/activity.controller');

const activityRouter = Router();

activityRouter.get('/', getAllActivities);
activityRouter.get('/:id', getActivity);
activityRouter.post('/', postNewActivity);

module.exports = activityRouter;