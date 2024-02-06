const router = require("express").Router();
const User = require("../Models/userModel.js");
const List = require("../Models/listModel.js");


// TASK


// Create

router.post("/addtask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => {
                existingUser.list.push(list);
                return existingUser.save();
            }).then(() => {
                return res.status(200).json({ list });
            });
        }
    } catch (error) {
        console.log(error);
    }
});


// Update

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        list.save().then((list) => {
            return res.status(200).json({ message: 'Task updated', list });
        });
    } catch (error) {
        console.log("Error on update:",error);
    }
});


// Delete

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id)
                .then(() => {
                    return res.status(200).json({ message: 'Task deleted' });
                });
        }
    } catch (error) {
        console.log(error);
    }
});


// GetTask

router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (list.length > 0) {
            res.status(200).json({ success: true, tasks: list });
        } else {
            res.status(404).json({ success: false, message: "No tasks found." });
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});



module.exports = router; 
