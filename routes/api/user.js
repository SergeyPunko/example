const express = require('express');
const router = express.Router();

//user model
const User = require('../../models/User');

//get User

router.get('/user/me', (req, res) => {
    console.log(req.isAuthenticated())
        res.json(req.user);
});


router.delete('/user/me', (req, res) => {
    try {
        User
            .find({ username })
            .then(user => user.remove())
            .then(res.json(
                {
                    success: true,
                    message: "User was deleted"
                }
            ))
    } catch (e) {
        res.status(404).json({
            session: false,
            message: "no User"
        })
    }
});

module.exports = router;