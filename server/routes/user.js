import express from 'express'
import { getUser, registerUser, updateUser, loginUser, followUser, refreshUser } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', getUser)
router.post('/refresh', auth, refreshUser)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.patch('/update', auth, updateUser)
router.post('/follow/:id', auth, followUser)

export default router