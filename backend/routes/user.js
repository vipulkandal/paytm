const express = require('express'); 
const { User } = require('../db');
const zod = require('zod');  
const jwt = require('jsonwebtoken');  

const router = express.Router();  

// Defining schema for user signup data validation
const signUpSchema = zod.object({
    userName: zod.string().email(),  
    password: zod.string(),  
    firstName: zod.string(),  
    lastName: zod.string()  
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post('/', (req, res) => {
    res.send('Hello World'); // Sending a simple response
});

router.post('/signup', async (req, res) => {
    const body = req.body; // Getting request body
    const { success, error } = signUpSchema.safeParse(body); // Validating request body

    // If validation fails, return error message
    if (!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs",
            error: error.message // Including error message in response
        });
    } 

    // Check if the user already exists in the database (pseudo code)
    const existingUser = User.findOne({
        userName: body.userName
    });

    // If user already exists, return a message
    if (existingUser) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    
    // Create a new user in the database (pseudo code)
    const dbUser = await User.create(body);

    // Generate a JWT token for the newly created user
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    // Return success message along with the token
    res.json({
        message: "User created successfully",
        token: token // Token is returned
    });
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router; 
