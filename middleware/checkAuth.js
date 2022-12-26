const jwt = require('jsonwebtoken');

const checkAuth = (req,res ,next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token , process.env.JWT_KEY);
            req.userData = decodedToken;
           return next();
        }catch(err ) {
            res.status(500).json({
                message:"Authentication field",
                error : err
            })
        }
}
module.exports = {
    checkAuth,
}