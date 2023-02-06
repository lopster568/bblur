import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        let decodedData
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, ')H@McQfThWmZq4t7w!z%C*F-JaNdRgUk')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}
export default auth