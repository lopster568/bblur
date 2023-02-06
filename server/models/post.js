import mongoose from 'mongoose'
const { Schema } = mongoose

const PostSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    img: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    preferred_tags: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    tags: { type: Array, default: []},
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Post", PostSchema);