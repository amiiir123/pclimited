const mongoose = require('mongoose')
const schemaEvent = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
      },
      start: {
          type: Date,
          required: true,
        },
        end: {
            type: Date,
            required: false,
        },
        allDay: {
            type: Boolean,
        },
        className: {
          type: String,
          required: true,
        },
    

})
module.exports = mongoose.model("events", schemaEvent);