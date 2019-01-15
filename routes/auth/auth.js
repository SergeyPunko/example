const express = require('express');
const router = express.Router();

//user model
const User = require('../../models/User');

module.exports = function (passport) {
    router.post('/signup', function (req, res) {
        const { username, password, mail } = req.body;
        User.findOne({ 'local.mail': mail }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "db error"
                });
            } else {
                if (doc) {
                    res.status(500).json({
                        success: false,
                        message: "mail already exists"
                    });
                } else {
                    const newUser = new User({
                        accounts: "local",
                        local: {
                            username: username,
                            mail: mail,
                            password: password
                        }
                    });
                    newUser.save((err, user) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: "db error"
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                message: "User is created"
                            });
                        }
                    })
                }
            }
        })
    })

    router.post('/login', passport.authenticate('local',
{
    session:true
}), (req, res) => {
        const mail = req.body.mail;
        const password = req.body.password;
        User.findOne({
            'local.mail': mail,
            'local.password': password
        },
            function (err, doc) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "error occured"
                    });
                }
                if (doc) {
                    res.status(200).json({
                        success: true,
                        message: "User is login"
                    });
                }
            }
        )
        console.log(req.isAuthenticated())
    });

    router.get('/logout', (req, res) => {
        console.log(req.isAuthenticated())
        req.logout();
        res.json(
            {
                success: true,
                message: "Logout"
            }
        )
    })

    router.get('/github',
    function (req, res,next) {
        console.log(req.isAuthenticated());
        console.log(req.user);
        next();
    },
    passport.authenticate('github', { session: true }));

    router.get('/github/callback',
        passport.authenticate('github'),
        function (req, res) {
            res.json(req.user);
        });

    return router;
}