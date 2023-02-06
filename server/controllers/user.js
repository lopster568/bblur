import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const exsistingUser = await User.findOne({ email: email })
        if (!exsistingUser) return res.status(404).json({ message: "User not found!" })
        const isPasswordCorrect = await bcrypt.compare(password, exsistingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })
        //SIGN JWT TOKEN
        const token = jwt.sign({ email: exsistingUser.email, id: exsistingUser._id }, ')H@McQfThWmZq4t7w!z%C*F-JaNdRgUk', { expiresIn: '3d' })
        res.status(200).json({ user: exsistingUser, token })
    } catch (error) {
        res.status(500).json(error)
    }
}
export const registerUser = async (req, res) => {
    const { username, displayName, email, password } = req.body
    try {
        const exsistingUser = await User.findOne({ email })
        if (exsistingUser) return res.status(404).json({ message: "User already exists!" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            email, displayName, username,
            password: hashedPassword
        })



        // trasporter.sendMail({
        //     to: createdUser.email,
        //     from: "aaravbackup568@gmail.com",
        //     subject: "Account Created",
        //     html: "<h1>Welcome to BeBlur</h1><p>Hope you enjoy your experience.</p>"
        // })

        //SIGN JWT TOKEN
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, ')H@McQfThWmZq4t7w!z%C*F-JaNdRgUk', { expiresIn: '3d' })
        res.status(200).json({ user: createdUser, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ err: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUserDetails = req.body
        const updatedUser = await User.findByIdAndUpdate(req.userId, updatedUserDetails, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(404).json({ err: err.message })
    }
}

export const refreshUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ err: err.message })
    }
}


export const followUser = async (req, res) => {
    try {
        const userToBeFollowed_Unfollowed = await User.findById(req.params.id)
        const currentUser = await User.findById(req.userId)
        const index = currentUser.following.findIndex(e => e.toString() === userToBeFollowed_Unfollowed._id.toString())
        if (index === -1) {
            currentUser.following.push(userToBeFollowed_Unfollowed)
            await currentUser.save()
            userToBeFollowed_Unfollowed.followers.push(currentUser)
            await userToBeFollowed_Unfollowed.save()
        } else {
            currentUser.following = currentUser.following.filter(e => e.toString() !== userToBeFollowed_Unfollowed._id.toString())
            await currentUser.save()
            userToBeFollowed_Unfollowed.followers = userToBeFollowed_Unfollowed.followers.filter(e => e.toString() !== userToBeFollowed_Unfollowed._id.toString())
            await userToBeFollowed_Unfollowed.save()
        }
    } catch (err) {
        res.status(404).json({ err: err.message })
    }
}
