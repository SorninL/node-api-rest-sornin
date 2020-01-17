/*
Require Mongoose
 */
const mongoose = require('mongoose');
/*
Get Schema from Mongoose
 */
const Schema = mongoose.Schema;
/*
Creating the Mongoose Schema
If you have to change this, you'll have to add a line into the route "update"
 */
let userSchema = new Schema({
    userName: String,
    isAdmin: {type: Boolean, default: false},
    isBanned: {type: Boolean, default: false},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    skinUrl: {type: String, default: null},
    mcUuid: {type: String, default: null},
    mcName: {type: String, default: null}
});
/*
Export Schema
 */
module.exports = mongoose.model('users', userSchema);
