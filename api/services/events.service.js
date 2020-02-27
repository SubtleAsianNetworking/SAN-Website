const Events = require('../models/events.model');

class EventService {

    getAll(){
        return Events.find();
    }

    getEventFromId(id){
        return Events.findById(id);
    }

    addEvent(data){
        const event = new Events(data);
        return event.save();
    }

    updateEvent(id, data){
        const event = this.getEventFromId(id);
        if (!event) return new Exception('Event is not found');
        data.id = event.id;
        return data.save();
    }
}

module.exports = new EventService();