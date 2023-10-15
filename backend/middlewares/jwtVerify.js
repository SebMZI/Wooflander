const jwt = require("jsonwebtoken")

const jwtVerify = (req, res, next) => {
    const bearerToken = req.headers.Authorization || req.headers.Authorization
    if(!bearerToken){
        return res.status(400).json({message: "Token is missing from headers!"})
    }
    const token = bearerToken.replace("Bearer ", "")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=> {
        if(err) return res.status(401).json({message: "Token is invalid or expired." })
        req.user = decodedToken
    })


}


module.exports = jwtVerify