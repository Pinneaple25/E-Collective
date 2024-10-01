const { Router } = require('express');
const { activityRouter } = require('./routers')

const api = Router();

api.use('/activities', activityRouter);

module.exports = api;