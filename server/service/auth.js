// const sessionIdToUserMap = new Map();
import jwt from 'jsonwebtoken';

export const setUser = (user) => {
    // sessionIdToUserMap.set(id, user);

    return jwt.sign({
        _id: user._id, 
        email: user.email,
    }, process.env.SECRET_KEY);
}

export const getUser = (token) => {
    // return sessionIdToUserMap.get(id);

    if(!token) return null;  // if jwt must be provided error shows

    return jwt.verify(token, process.env.SECRET_KEY);
}