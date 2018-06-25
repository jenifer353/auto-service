import mongoose from 'mongoose'

const schema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    service: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

const model = mongoose.model('realty', schema)
export default model
