/*
Require and setting up Express Router
 */
let express = require('express');
let router = express.Router();
/*
Require mongoose Schema
 */
const serverSchema = require('../models/serverModel');
/*
createServer route
Creates a server by Name
 */
router.post('/createServer', (req, res) => {
   if (req.body) {
       const {serverName} = req.body;
       if (!serverName) {
          res.sendStatus(400);
       } else {
           serverSchema.find({'serverName': serverName}, (err, server) => {
              if (err) {
                  res.sendStatus(400);
              } else if (server.length) {
                  res.sendStatus(302);
              } else {
                  let newServer = {};
                  newServer.serverName = serverName;
                  if (req.body.owners) newServer.owners = req.body.owners;
                  if (req.body.isReady) newServer.isReady = req.body.isReady;
                  if (req.body.isOnline) newServer.isOnline = req.body.isOnline;
                  if (req.body.maxPlayers) newServer.maxPlayers = req.body.maxPlayers;
                  if (req.body.port) newServer.port = req.body.port;
                  if (req.body.onlinePlayers) newServer.onlinePlayers = req.body.onlinePlayers;
                  if (req.body.isModded) newServer.isModded = req.body.isModded;
                  if (req.body.isDev) newServer.isDev = req.body.isDev;
                  if (req.body.hasWhitelist) newServer.hasWhitelist = req.body.hasWhitelist;
                  const server = new serverSchema(newServer);
                  server.save((err, server) => {
                      if (err) {
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(200);
                      }
                  });
              }
           });
       }
   } else {
       res.sendStatus(400);
   }
});
/*
getServer route
Gets servers
 */
router.get('/getServer/:serverName', (req, res) => {
    if (req.params) {
        const {serverName} = req.params;
        if (!serverName) {
            res.sendStatus(400);
        } else {
            serverSchema.find({'serverName': serverName}, (err, server) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    if (server.length > 0) {
                        res.status(200).send(server);
                    } else {
                        res.sendStatus(404);
                    }
                }
            })
        }
    } else {
        res.sendStatus(400);
    }
});
/*
getAllServers route
Gets all servers
 */
router.get('/getAllServers', (req, res) => {
    serverSchema.find({}, (err, servers) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            if (servers.length > 0) {
                res.status(200).send(servers);
            } else {
                res.sendStatus(404);
            }
        }
    });
});
/*
updateServer route
Updates server
 */
router.patch('/updateServer', (req, res) => {
    if (req.body) {
        let objectUpdate = {};
        if (req.body.serverName) {
            if (req.body.serverName) objectUpdate.serverName = req.body.serverName;
            if (req.body.owners) objectUpdate.owners = req.body.owners;
            if (req.body.isReady) objectUpdate.isReady = req.body.isReady;
            if (req.body.isOnline) objectUpdate.isOnline = req.body.isOnline;
            if (req.body.maxPlayers) objectUpdate.maxPlayers = req.body.maxPlayers;
            if (req.body.port) objectUpdate.port = req.body.port;
            if (req.body.onlinePlayers) objectUpdate.onlinePlayers = req.body.onlinePlayers;
            if (req.body.isModded) objectUpdate.isModded = req.body.isModded;
            if (req.body.isDev) objectUpdate.isDev = req.body.isDev;
            if (req.body.hasWhitelist) objectUpdate.hasWhitelist = req.body.hasWhitelist;
            serverSchema.updateOne({'userName': req.body.serverName}, objectUpdate, {}, (err, response) => {
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
deleteServer route
Deletes server
 */
router.delete('/deleteServer/:serverName', (req, res) => {
    if (req.params) {
        const {serverName} = req.params;
        if (!serverName) {
            res.sendStatus(400);
        } else {
            serverSchema.find({'serverName': serverName}).deleteOne((err, result) => {
                if (err) {
                    res.sendStatus(400);
                } else if (result.deletedCount > 0) {
                    res.sendStatus(200);
                    console.log(`Server ${serverName} has been deleted from database`)
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
