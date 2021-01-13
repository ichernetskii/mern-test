const {Router} = require("express");
const router = Router();

const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

// JWT
const jwt = require("jsonwebtoken");

// Model
const User = require("../models/User.js");

// Config
const config = require("config");

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Wrong email").isEmail(),
        check("password", "Minimal password length: 6").isLength({min: 6})
    ],
    async (req, res) => {
        try {
            // Server validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong registration data."
                })
            }

            const {email, password} =  req.body;
            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exists.`})
            }

            // password hashing
            const hashedPwd = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPwd});
            await user.save();

            res.status(201).json({message: "User created."});
        } catch (e) {
            res.status(500).json({message: "Something goes bad. Try again."})
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Input correct email.").normalizeEmail({gmail_remove_dots: false}).isEmail(),
        check("password", "Enter password.").exists()
    ],
    async (req, res) => {
        try {
            // Server validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong login data."
                })
            }

            const {email, password} =  req.body;
            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: "User not found."});
            }

            const isMatch = await bcrypt.compare(password, user?.password);

            if (!isMatch) {
                return res.status(400).json({message: "Wrong password."});
            }

            // generate JWT Token
            const token = jwt.sign(
                { userId: user?.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );

            res.status(200).json({token, userId: user?.id});
        }
        catch (e) {
           res.status(500).json({message: "Something goes bad. Try again."})
        }
    });

module.exports = router;
