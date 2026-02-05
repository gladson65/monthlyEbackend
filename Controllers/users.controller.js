import userModel from '../Models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// business logic for user register
export function register(req, res) {

    const { name, email, password } = req.body;

    // key validations
    if (!name) return res.status(400).json({message: "name field is missing"});
    if (!email) return res.status(400).json({message: "email field is missing"});
    if (!password) return res.status(400).json({message: "password field is missing"});

    // field validation
    if (name.length < 3) return res.status(400).json({message: "Username must be 3 or more characters."});
    let testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!testEmail) return res.status(400).json({error: "email", key:"email", message: "Invalid Email Format"})
    let testPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);
    if (!testPassword) return res.status(400).json({message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."});

    // check the email is already exist or not
    userModel.findOne({email: email}).then((data)=> {

        // if not previous data then create new
        if (!data) {
            // prepare data
            const newUser = new userModel({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            })

            // /save the newUser in the database
            newUser.save().then((data)=> {
                return res.status(201).json({message: "User Registration Successfull", user: data})
            })
        }
        else {
            return res.status(400).json({message: "User already exist, try with another email"})
        }
    
    }).catch((error)=> {
        return res.send(500).json({error: error.message});
    })
    
} 