const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    // Id: {
    //     type: ObjectId,
    //     required: true,
    //     ref: 'City'
    // },
    mobile: Number,
    media_url: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)