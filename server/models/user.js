import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new mongoose.Schema({
    displayName: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String },
    followers: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    likes: [{
        type: Schema.Types.ObjectId, ref: 'Post'
    }],
    notifications: [{
        fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
        message: String,
        createdAt: { type: Date, default: Date.now }
    }],
    preferred_tags: { type: Array, default: [] },
    saved_posts: [{
        type: Schema.Types.ObjectId, ref: 'Post'
    }],
    settings: {
        discoveryMode: { type: Boolean, default: true },
        relevantContent: { type: Boolean, default: true },
        privateAccount: { type: Boolean, default: false },
        shyMode: { type: Boolean, default: false }
    },
    posts: [{
        type: Schema.Types.ObjectId, ref: 'Post'
    }]
})

export default mongoose.model("User", UserSchema);
