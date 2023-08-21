import { User } from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";

export const handleUserSignup = async (req, res) => {
    const { name, email, password} = req.body;
    await User.create({
        name, 
        email,
        password,
    })

    return res.redirect('/');
}

export const handleUserLogin = async (req, res) => {
    const { email, password} = req.body;
    
    const user = await User.findOne({ email, password});

    if(!user) return res.render('login', {
        error: "Invalid Username or Password",
    })

    // const sessionId = uuidv4();
    // setUser(sessionId, user);

    const token = setUser(user);
    res.cookie('token', token);   // using cookie

    return res.redirect('/');

    // return res.json({token});       // using response
}