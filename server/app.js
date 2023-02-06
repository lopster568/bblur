// IMPORTS----------------------------------------------------------------
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import ImageKit from 'imagekit'
import auth from './middleware/auth.js'
import { spawn } from 'child_process'
import multer from 'multer'
import fs from 'fs'
import * as fsExtra from "fs-extra";
import Post from './models/post.js'
import User from './models/user.js'
import dotenv from 'dotenv'

dotenv.config()

import {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

// ROUTE IMPORTS----------------------------------------------------------
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'


// CONFIGURATION----------------------------------------------------------
const app = express()
const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/xcuqahb2st38',
    publicKey: 'public_RR6bfJBYwkidUbZcaYUvdNfv2Ow=',
    privateKey: 'private_VAswuspfqK9ylEByON3Ua25CFGs='
});

// allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }));

// SERVER-----------------------------------------------------------------
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        app.listen(process.env.PORT || "8000", () => {
            console.log("database connected & server started")
        })
        return
    }
    console.log(err)
})

// ROUTES-----------------------------------------------------------------
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// MULTER--------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './utils/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

app.post("/api/post", auth, upload.single("postImg"), async (req, res) => {
    const { caption, tags } = req.body

    const newPost = {
        caption,
        tags: (tags.split(" ").join("")).split(","),
        author: req.userId,
    }

    var data;
    const python = spawn(`python3`, [`./blur-recognization.py`])
    python.stdout.on('data', (returnedData) => {
        console.log('pipe data from script')
        data = returnedData.toString()
    })
    python.on('exit', async (code) => {
        if (code !== 0) console.log("PYTHON ERROR")
        if (Number(data) === 1) {
            console.log("is this tru?")
            fs.readFile(req.file.path, function (err, data) {
                if (err) throw err;
                imagekit.upload({
                    file: data,
                    fileName: req.file.filename
                }, async (error, result) => {
                    if (error) console.log(error);
                    else {
                        console.log("SAVING POST")
                        const newPost = {
                            caption: req.body.caption,
                            author: req.userId,
                            img: result.url,
                            tags: (req.body.tags.split(" ").join("")).split(",")
                        }
                        try {
                            console.log("SAVING database POST")

                            const createdPost = await Post.create(newPost)
                            const user = await User.findById(req.userId)
                            user.posts.push(createdPost)
                            const savedPost = await user.save()
                            res.status(200).json({...savedPost, message: "Post Created Successfully"})
                            fsExtra.emptyDirSync(req.file.destination);
                        } catch (err) {
                            res.status(500).json({ message: err.message })
                        }
                    }
                });
            });
        } else {
            res.status(200).json({message: "Image is not blurred enough", blur: 0})
            fsExtra.emptyDirSync(req.file.destination);
        }
    });
})