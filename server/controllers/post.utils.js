import Post from '../models/post.js'
import User from '../models/user.js'


//POST MODIFICATIONS
export const savePost = async (req, res) => {
    const postId = req.params.id
    try {
        const post = await Post.findById(postId)
        const user = await User.findById(req.userId)
        const index = user.saved_posts.findIndex(id => id.toString() === postId)

        if (index === -1) {
            user.saved_posts.push(post)
            await user.save()
            return res.status(200).json({ message: 'Post Saved' })
        }
        res.status(404).json({ message: 'Post Already Saved' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    if (!req.userId) return res.json({ message: "NO USER" })
    const postId = req.params.id
    try {
        const post = await Post.findById(postId)
        const index = post.likes.findIndex(id => id.toString() === req.userId)
        if (index === -1) {
            post.likes.push(req.userId)
            const user = await User.findById(req.userId)
            post.tags.forEach(e => {
                if (user.preferred_tags.findIndex(tag => e === tag) === -1) {
                    user.preferred_tags.push(e)
                }
            })
            await user.save()
            await post.save()
            return
        }
        post.likes = post.likes.filter(id => id.toString() !== req.userId)
        await post.save()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const commentPost = async (req, res) => {
    const postId = req.params.id
    try {
        const post = await Post.findById(postId)
        const user = await User.findById(req.userId)
        post.comments.push({
            user: user,
            comment: req.body.comment
        })
        const commentedPost = await post.save()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updatePost = (req, res) => {
    res.send("Post Updated")
}

export const deletePost = async (req, res) => {
    const postId = req.params.id
    try {
        await Post.findByIdAndDelete(postId)
        const user = await User.findById(req.userId)
        const filteredPosts = user.posts.filter(post => post != postId)
        user.posts = filteredPosts
        await user.save()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

