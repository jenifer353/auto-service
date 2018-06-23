import mongoose from 'mongoose'

const schema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    booked: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    bookedTime: [Number, Number],
    name: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    },
    description: {
        required: true,
        type: String
    }
})

const model = mongoose.model('realty', schema)
export default model
