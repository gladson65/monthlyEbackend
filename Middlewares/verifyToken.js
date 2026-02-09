import jwt from 'jsonwebtoken';
import userModel from '../Models/users.model.js';


// function for verify token
export function verifyToken(req, res, next) {

    // first check jwt token is present or not in the headers
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === 'JWT'
    ){
        // verify the jwt
        jwt.verify(req.headers.authorization.split(" ")[1], `${process.env.SecretKey}`, function(error, verifiedToken) {
            // if getting error for token verification, then return with "403 http status"
            if (error) {
                return res.status(403).json({error: error.message});
            }

            // find the user with the verified ID and give access
            userModel.findById(verifiedToken._id).then((user)=> {
                req.user = user;
                next();
            
            }).catch((error)=> {
                return res.status(500).json({error: error.message})
            })
        })
    }
    // if token is not present
    else {
        return req.status(403).json({message: "Access token is not present."});
    }
}