module.exports = {
    "isLoggedIn":function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.status(500).send("Not Authenticated")
        }
    }
}