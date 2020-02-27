const Joi = require('@hapi/joi');
const { BaseController } = require('./base.controller');
const EventsService = require('../services/events.service');

class EventsController extends BaseController {

    async getAll(_, res) {
        try {
            const data = await EventsService.getAll();

            this.success(res)
                .json(data);
        }
        catch (e) {
            this.handleException(res, e);
        }
    }

    async getEventFromId(req, res) {
        try {

            const { id } = req.params;

            const data = await RequestFormService.getEventFromId(id);
            if (!data) { return this.notFound(res, `Event with id ${id} is not found.`); }

            this.success(res)
                .json(data);
        }
        catch (e) {
            this.handleException(res, e);
        }
    }

    async addEvent(req, res) {
        try {
            const result = this.validate(Joi.object({
                time: Joi.date().required(),
                location: Joi.string().required(),
                topic: Joi.string().required(),
                affliation: Joi.string().required(),
                approved: Joi.boolean().default(false).optional(),
            }), req.body);

            result.approved = false;

            if (result.error) {
                return this.validationError(res, result.error);
            }

            await EventsService.addEvent(req.body);

        } catch (e) {
            this.handleException(res, e);
        }
    }
}


module.exports = new EventsController();