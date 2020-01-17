/*
Start logs
 */
console.log('api-rest is starting ...');
/*
Requiries
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRouter');
const serverRouter = require('./Routes/serverRouter');
/*
Mongoose setup
 */
mongoose.set('useFindAndModify', false);
/*
Database link with mongoose
 */
const database = "apirest";
mongoose.connect(`mongodb://localhost:27017/${database}`, { useUnifiedTopology: true, useNewUrlParser: true }).
catch(error => handleError(error));
console.log('API connected to apirest');
/*
API default setup
 */
const port = 3030;
console.log(`API port : ${port}`);
const api = express();
/*
Express setup
 */
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
/*
Route definitions
 */
api.use('/users', userRouter);
api.use('/servers', serverRouter);
/*
API listen
 */
api.listen(port, () => {
    console.log(`api-rest listenning on ${port}`);
});
