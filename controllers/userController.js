const userModule = require('../models/userModel')

const userController = async (req, res, next) => {
    try {
        const { first_name, last_name, email, address } = req.body
        if (!first_name || !last_name || !email || !address) {
            return res.status(400).send({
                success: false,
                message: 'Please provide All Fields'
            })
        }
        const user = await userModule.create({
            first_name, last_name, email, address
        })

        console.log(`user is Created ${user}`);

        if (user) {
            res.status(201).json({
                success: true,
                message: "User Created Succesfully"
            })
        }
    } catch (error) {
        next(error)
    }
}

const userControllerGet = async (req, res, next) => {
    const user = await userModule.find({})
    try {
        res.status(200).send({
            sucesss: true,
            message: "get method call",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

const userControllerUpdate = async (req, res, next) => {
    try {
        const { first_name, last_name, email, address } = req.body;
        const UserId = req.body.id;
        const findUser = await userModule.findById(UserId)

        if (findUser) {
            findUser.first_name = first_name;
            findUser.last_name = last_name;
            findUser.email = email;
            findUser.address = address
            await findUser.save()

            res.status(201).send({
                success: true,
                message: `${findUser.first_name} is updated successfull updated`,
                updatedData: findUser
            })
        }
    } catch (error) {
        next(error)
    }
}

const userControllerDelete = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const findUser = await userModule.findByIdAndDelete(userId);
        if (findUser) {
            res.status(200).send({
                sucesss: true,
                message: `${findUser.first_name} is deleted`
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { userController, userControllerGet, userControllerUpdate, userControllerDelete };