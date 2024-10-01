const { Router } = require('express');
const activityRouter = require('@routers/activity.router')

const api = Router();

api.use('/activities', activityRouter);

module.exports = api;