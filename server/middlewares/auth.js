import { getUser } from "../service/auth.js";

export const checkForAuthentication = (req, res, next) => {
    const authorizatoinHeaderValue = req.headers["authorization"];

    req.user = null;

    if(!authorizatoinHeaderValue || !authorizatoinHeaderValue.startWith("Bearer")) return next();

    const token = authorizatoinHeaderValue.split('Bearer ')[1];

    const user = getUser(token);

    req.user = user;

    return next();


}

export const restrictTo = (roles) => {
    return (req, res, next) => {
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}