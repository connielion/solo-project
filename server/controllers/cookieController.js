const cookieController = {};
/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
    // write code here
    res.cookie('ssid', res.locals.id, { httpOnly: true });
    next();
}

module.exports = cookieController;