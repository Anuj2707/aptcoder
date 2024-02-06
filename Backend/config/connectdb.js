const mongoose = require('mongoose');

const connectToDb = async (req, res) => {

    try {
        await mongoose
            .connect(process.env.MONGO_URI)
            .then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
            .catch((err) => {
                console.log(err);
                process.exit(1)
            });
    } catch (error) {
        console.log(`Can't connect to your Database . Please try again !! ${error.message}`);
    }

};
 
connectToDb(); 
