import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js';

export const Protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse('No User Found with this ID', 404))
        }

        req.user = user
        next()
    } catch (error) {
        console.log('ERROR AUTHORIZING USER',error.name, error)
        if (error.name === 'JsonWebTokenError') {
            console.log('ONE')
            return next(new ErrorResponse('Invalid token', 401));
        } else if (error.name === 'TokenExpiredError') {
            console.log('TWO')
            return next(new ErrorResponse('Token expired', 401));
        } else {
            console.log('THREE')
            return next(new ErrorResponse('Not Authorized to access this route', 401));
        }
    }
}


export const AdminProtect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse('No User Found with this ID', 404))
        }

        if(!user.isAdmin){
            return next(new ErrorResponse('No User Found with this ID', 404))
        }

        req.user = user
        next()
    } catch (error) {
        console.log('ERROR AUTHORIZING USER',error.name, error)
        if (error.name === 'JsonWebTokenError') {
            console.log('ONE')
            return next(new ErrorResponse('Invalid token', 401));
        } else if (error.name === 'TokenExpiredError') {
            console.log('TWO')
            return next(new ErrorResponse('Token expired', 401));
        } else {
            console.log('THREE')
            return next(new ErrorResponse('Not Authorized to access this route', 401));
        }
    }
}

//export default { Protect, AdminProtect }