const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            success: false,
            message: 'Authorization Declined'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid or Expired Token'
        });
    }
};

module.exports = userAuth;
