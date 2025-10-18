const express = require('express')
const { body, validationResult } = require('express-validator')
const userModel = require('../models/user.model');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data'

            })
        }
        const { email, name, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            email,
            name,
            password: hashPassword

        })
        res.json(newUser)
    })

router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data'

            })
        }

        const { email, password } = req.body

        const user = await userModel.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const token = jwt.sign({
            user_id: user._id,
            email: user.email,
            name: user.name

        },
            process.env.JWT_SECRET
        )

        res.cookie('token',token)
        res.send('logged in')
    })

module.exports = router 