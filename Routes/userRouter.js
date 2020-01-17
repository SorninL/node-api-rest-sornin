/*
Require and setting up Express Router
 */
let express = require('express');
let router = express.Router();
/*
Require mongoose Schema
 */
const userSchema = require('../models/userModel');
/*
createUser
 */
router.post('/createUser', (req, res) => {
    if (req.body) {
        const {userName} = req.body;
        if (!userName) {
            res.sendStatus(400);
        } else {
            userSchema.find({'userName': userName}, (err, user) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    if (user.length > 0) {
                        res.sendStatus(302);
                    } else {
                        let newUser = {};
                        newUser.userName = userName;
                        if (req.body.isAdmin) newUser.isAdmin = req.body.isAdmin;
                        if (req.body.isBanned) newUser.isBanned = req.body.isBanned;
                        if (req.body.firstName) newUser.firstName = req.body.firstName;
                        if (req.body.lastName) newUser.lastName = req.body.lastName;
                        if (req.body.skinUrl) newUser.skinUrl = req.body.skinUrl;
                        if (req.body.mcUuid) newUser.mcUuid = req.body.mcUuid;
                        if (req.body.mcName) newUser.mcName = req.body.mcName;
                        const user = new userSchema(newUser);
                        user.save((err, user) => {
                            if (err) {
                                res.sendStatus(400);
                            } else {
                                res.sendStatus(200);
                                console.log(`New user : ${userName}`);
                            }
                        });
                    }
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});
/*
getUserByName route
Gets the user by name
 */
router.get('/getUser/:userName', (req, res) => {
    if (req.params) {
        const {userName} = req.params;
        if (!userName) {
            res.sendStatus(400);
        } else {
            userSchema.find({'userName': userName}, (err, user) => {
                if(err) {
                    console.error(err);
                    res.sendStatus(400);
                } else {
                    if (user.length > 0) {
                        res.status(200).send(user);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});
/*
getAllUsers route
Gets all users in DB
 */
router.get('/getAllUsers', (req, res) => {
    userSchema.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.sendStatus(404);
            }
        }
    });
});
/*
updateUserSkin route
Updates the skin of the selected user
 */
router.patch('/updateUser', (req, res) => {
    if (req.body) {
        let objectUpdate = {};
        if (req.body.userName) {
            objectUpdate.userName = req.body.userName;
            if (req.body.isAdmin) objectUpdate.isAdmin = req.body.isAdmin;
            if (req.body.isBanned) objectUpdate.isBanned = req.body.isBanned;
            if (req.body.firstName) objectUpdate.firstName = req.body.firstName;
            if (req.body.lastName) objectUpdate.lastName = req.body.lastName;
            if (req.body.skinUrl) objectUpdate.skinUrl = req.body.skinUrl;
            if (req.body.mcUuid) objectUpdate.mcUuid = req.body.mcUuid;
            if (req.body.mcName) objectUpdate.mcName = req.body.mcName;
            userSchema.updateOne({'userName': req.body.userName}, objectUpdate, {}, (err, response) => {
                if (err) {
                    res.sendStatus(400)
                } else if (response.ok > 0) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            });
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
});
/*
deleteUser route
 */
router.delete('/deleteUser/:userName', (req, res) => {
    if (req.params) {
        const {userName} = req.params;
        if (!userName) {
            res.sendStatus(400);
        } else {
            userSchema.find({'userName': userName}).deleteOne((err, result) => {
                if (err) {
                    res.sendStatus(400);
                } else if (result.deletedCount > 0) {
                    res.sendStatus(200);
                    console.log(`User ${userName} has been deleted from database`)
                } else {
                    res.sendStatus(404);
                }
            })
        }
    } else {
        res.sendStatus(400);
    }
});
/*
Exports the router
 */
module.exports = router;
