import mongoose from 'mongoose'

const schema = mongoose.Schema({
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
