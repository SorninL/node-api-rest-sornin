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
let serverSchema = new Schema({
    serverName: String,
    owners: {type: Array, default: ['Sornin']},
    isReady: {type: Boolean, default: false},
    isOnline: {type: Boolean, default: false},
    maxPlayers: {type: Number, default: 0},
    port: {type: Number, default:0},
    onlinePlayers: {type: Number, default:0},
    isModded: {type: Boolean, default: false},
    isDev: {type: Boolean, default: false},
    hasWhitelist: {type: Boolean, default: true}
});
/*
Export Schema
 */
module.exports = mongoose.model('servers', serverSchema);
