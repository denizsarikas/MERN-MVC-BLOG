const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, ref:'User',
    },
    // user_id: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true})

module.exports = mongoose.model('Blog', blogSchema)