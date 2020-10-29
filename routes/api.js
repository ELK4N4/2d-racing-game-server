const express = require('express');
const router = express.Router();
const boxen = require('boxen');
const chalk = require('chalk');


const roomsDB = require('../models/rooms');
const playersDB = require('../models/players');

const carColors = ['Red', 'Blue', 'Yellow', 'Black'];
function setPlayerCarColor(playerNumber, player) {
    player.color = carColors[playerNumber];
    playersDB.updatePlayerById(player.id, player);
}

router.get('/quick-match/:maxPlayers', function(req, res, next) {
    let newPlayer = playersDB.createNewPlayer();

    let allRooms = roomsDB.getAllRooms();
    let roomId;
    let addedToRoom = false;

    allRooms.forEach(room => {
        if(room.maxPlayers !== req.params.maxPlayers) {
            return;
        } else if (room.maxPlayers > room.playersList.length && !room.gameStarted) {
            setPlayerCarColor(room.playersList.length, newPlayer);
            roomsDB.addPlayerToRoom(room.id, newPlayer);
            addedToRoom = true;
            roomId = room.id;
        }
    });

    if(!addedToRoom) {
        roomId = roomsDB.openNewRoom(req.params.maxPlayers);
        setPlayerCarColor(0, newPlayer);
        roomsDB.addPlayerToRoom(roomId, newPlayer);
    }


    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(boxen(`  New player(${newPlayer.color}) connected to ${req.params.maxPlayers} players room  `, {padding: 0, margin: 0}));
    console.log(chalk.green(`Players connected to the server: ${playersDB.getAllPlayers().length}`));
    process.stdout.write("> ");

    res.json({room: roomsDB.getRoomById(roomId), player: newPlayer});
});

router.post('/room/:id', function(req, res, next) {
    let roomId = req.params.id;
    let room = roomsDB.getRoomById(roomId)

    if(room.maxPlayers == room.playersList.length) {
        room.gameStarted = true;
        roomsDB.updateRoomById(roomId, room);
    }

    let player = req.body.player;
    playersDB.updatePlayerById(player.id, player);

    res.json({room, players: playersDB.getAllPlayersIdsAInARoom(room)});
});

router.post('/test/:id', function(req, res, next) {
    res.json({params: req.params.id, body: req.body});
});

//Testing
router.get('/rooms/', function(req, res, next) {
    res.json(roomsDB.getAllRooms());
});

router.get('/players/', function(req, res, next) {
    res.json(playersDB.getAllPlayers());
});

module.exports = router;