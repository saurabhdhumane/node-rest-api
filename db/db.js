const mongoose = require('mongoose');

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOOSE_DB);
        console.log(`Conneted to the database ${mongoose.connection.name} & host is ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`error occur in database connection ${mongoose.connection.name} is please `, error);
        mongoose.connection.close()
    }
}

module.exports = db;