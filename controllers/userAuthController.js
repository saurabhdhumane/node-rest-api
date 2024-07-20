const UserAuthModel = require('../models/UserAuthModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userAuthControllerHome = async (req, res, next) => {
    try {
        const userAuth = await UserAuthModel.find({})
        res.status(201).json({
            success: true,
            message: "UserAuth Controller data",
            method: "Get",
            nbhit: userAuth.length,
            collection: userAuth
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "userAuth Home Controller error Occurs",
            error: error.message
        })
        next(error)
    }

}

const userAuthControllerRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "please Provide All Fields",
            })
        }
        const exist = await UserAuthModel.findOne({ email })
        if (exist) {
            return res.status(400).send({
                success: false,
                message: "Email is Already register"
            })
        }


        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const register = await UserAuthModel.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).send({
            success: true,
            message: `${register.name} is created succesfully`,
            register
        })

    } catch (error) {
        next(error)
    }
}


const createJWT = async (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const userAuthControllerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next("please Provide Login Details")
        }
        const user = await UserAuthModel.findOne({ email })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Auth Login False",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Login Details"
            })
        }

        const token = await createJWT(user.id)
        res.status(200).json({
            success: true,
            message: "Login Successfull",
            user,
            token
        })


    } catch (error) {
        next(error)
    }
}


module.exports = { userAuthControllerHome, userAuthControllerRegister, userAuthControllerLogin }