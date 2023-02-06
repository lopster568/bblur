
import express from 'express'
import auth from '../middleware/auth.js'
import { createPost, getPost, getAllPosts, getSavedPosts, getFollowingPosts, getPostByUser } from '../controllers/post.js'
import { likePost, commentPost, savePost, updatePost, deletePost } from '../controllers/post.utils.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/feed', auth, getFollowingPosts)
router.get('/:id', getPost)

// router.post('/', auth, upload.single("postImg"), createPost)
router.post("/saved", auth, getSavedPosts)
router.post("/postsby/:id", auth, getPostByUser)

//UTILS ROUTES
router.patch('/:id/like/', auth, likePost)
router.patch('/:id/comment', auth, commentPost)
router.post('/:id/save', auth, savePost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)


export default router