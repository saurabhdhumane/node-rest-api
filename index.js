require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const homeRouter = require('./routers/HomeRouter');
const userRouter = require('./routers/UserRouter');
const filterRouter = require('./routers/filterRouter')
const userAuthRouter = require('./routers/userAuthRouter')
const db = require('./db/db');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = process.env.PORT || 8081;

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome Its Working" });
    } catch (error) {
        console.log(`Error in app: ${error}`);
    }
});



// Routing
app.use((req, res, next, err) => {
    res.status(404).send({
        success: false,
        message: "api not found",
    })
    next(err)
})


//middleweres

app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use('/filter', filterRouter)
app.use('/auth', userAuthRouter)

// Error Handling Middleware
app.use(errorHandler);

const appStart = async () => {
    try {
        await db();
        app.listen(port, () => {
            console.log(`Server is running successfully on port: ${port}`);
        });
    } catch (error) {
        console.error('Error starting the application', error);
    }
};

appStart();
