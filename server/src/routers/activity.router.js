const { Router } = require('express');
const { 
  getAllActivities,
  getActivity,
  postNewActivity,
  putActivity,
  deleteActivity,
} = require('@controllers/activity.controller');

const activityRouter = Router();

activityRouter.get('/', getAllActivities);
activityRouter.get('/:id', getActivity);
activityRouter.post('/', postNewActivity);
activityRouter.put('/:id', putActivity);
activityRouter.delete('/:id', deleteActivity);

module.exports = activityRouter;