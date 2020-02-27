const eventsController = require('../controllers/events.controller');
const express = require('express');
const eventRoutes = express.Router();

eventRoutes.route('/').get(eventsController.getAll.bind(eventsController));
eventRoutes.route('/:id').get(eventsController.getEventFromId.bind(eventsController));
eventRoutes.route('/add').post(eventsController.addEvent.bind(eventsController));

module.exports = eventRoutes;