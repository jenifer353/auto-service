import mongoose from 'mongoose'

const schema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        dropDups: true
    },
    password: {
        required: true,
        type: String
    }
})

const model = mongoose.model('users', schema)
export default model
