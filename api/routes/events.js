
const express = require('express')
const Events = require('../models/events.model');

const eventRoutes = express.Router();

eventRoutes.route('/').get(function(req, res) {
    Events.find(function(err, events) {
        if (err) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
});

eventRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Events.findById(id, function(err, event) {
        res.json(event);
    });
});

eventRoutes.route('/add').post(function(req, res) {
    console.log(req.body)
    let event = new Events(req.body);
    event.save()
        .then(event => {
            res.status(200).json({'event': event});
        })
        .catch(err => {
            res.status(400).send('adding new event failed');
        });
});

eventRoutes.route('/update/:id').post(function(req, res) {
    Events.findById(req.params.id, function(err, event) {
        if (!event)
            res.status(404).send('data is not found');
        else
            event.datetime = req.body.datetime;
            event.loation = req.body.location;

            event.save().then(event => {
                res.json('Event updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = eventRoutes;