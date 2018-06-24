import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        dropDups: true
    },
    isService: {
        required: false,
        type: Boolean
    },
    address: {
        required: false,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

const model = mongoose.model('users', schema)
export default model
