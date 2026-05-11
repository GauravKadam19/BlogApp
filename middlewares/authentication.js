const {validateToken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if(!tokenCookieValue) return next(); // no token 
        
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // adding key value in req object
        }
        catch(err){};

        return next();
        
    }
}

module.exports = {
    checkForAuthenticationCookie,
}