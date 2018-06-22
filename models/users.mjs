import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        dropDups: true
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
