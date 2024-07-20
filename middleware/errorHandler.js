const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose duplicate key error
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const value = err.keyValue[field]; 
        return res.status(400).json({
            success: false,
            error: 'Duplicate field value entered',
            message: `The value '${value}' for the field '${field}' already exists. Please provide a unique value.`
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({
            success: false,
            error: 'Validation error',
            message: errors.join('. ')
        });
    }

    // Default to 500 server error
    res.status(500).json({
        success: false,
        error: 'Something went wrong',
        message: err.message
    });
};

module.exports = errorHandler;
