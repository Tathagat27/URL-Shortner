import { getUser } from "../service/auth.js";

export const restrictToLoggedInUserOnly = async (req, res, next) => {
    // const userUid = req.cookies?.uid;

    console.log("From RestrictLogged:", req.headers);
    const userUid = req.headers["authorization"];

    if(!userUid) return res.redirect('/login');

    const token = userUid.split("Bearer ")[1];

    // const user = getUser(userUid);

    const user = getUser(token);

    if(!user) return res.redirect('/login');

    req.user = user;
    next();
}

export const checkAuth = async (req, res, next) => {
    // const userUid = req.cookies?.uid;

    console.log("From checkAuth:", req.headers);
    const userUid = req.headers["authorization"];


    // const user = getUser(userUid);

    const token = userUid.split("Bearer ")[1];

    const user = getUser(token);

    req.user = user;

    next();
}