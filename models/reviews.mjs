import mongoose from 'mongoose'

const schema = mongoose.Schema({
    forUser: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    fromUser: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    text: {
        required: true,
        type: String
    }
})

const model = mongoose.model('reviews', schema)
export default model
