
// This is a middleware for authentication. Here we check whether there is a token stored in the browser database for session.
// EveryTime a user registers or login a JWT session code is created and stored in browser DB
// Commands for transporting this session code from backend to browser DB will be present in  React files
// I will explain you how to do that
const jwt=require('jsonwebtoken');
const config=require('config');



module.exports=function (req,res,next) {
    //Get token from header

    const token=req.header('x-auth-token');

// Check if not token

    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});

    }
    try {
        const decoded=jwt.verify(token,config.get('jwtSecret'));
        // console.log(decoded);
        // console.log(decoded.user.toString()+'I am decoded user');
        req.user=decoded.user;
        // console.log(req.user.id);
        // console.log('---------------');
        next();
    }catch (err) {
        res.status(401).json({msg:'Token is not valid'})
    }
};
