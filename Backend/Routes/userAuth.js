const router = require("express").Router();
const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs")

// Registation
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(200).json({ message: "User with this email or username already exists" });
        }

        const hashPassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashPassword, spy: password });

        await user.save();
        return res.status(200).json({ message: "Sign Up successfull" });
        // password = undefined;
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



// SIGN IN

router.post("/signin", async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Please sign up first!" });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Can't log in" });
    }
});



module.exports = router; 