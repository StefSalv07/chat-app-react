const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chatapp", {
            // useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });

        console.log(`MongoDB connection SUCCESS: ${connection.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection FAIL: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB;