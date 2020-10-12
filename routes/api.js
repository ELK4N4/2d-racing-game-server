const express = require('express');
const router = express.Router();

const roomsDB = require('../models/rooms');
const playersDB = require('../models/players');



router.get('/quick-match/:players', function(req, res, next) {
    let newPlayer = playersDB.createNewPlayer();

    let allRooms = roomsDB.getAllRooms();
    let roomId;
    let addedToRoom = false;

    allRooms.forEach(id => {
        let room = roomsDB.getRoomById(id);
        if(room.players !== req.params.players) {
            return;
        } else if (room.players > room.playersList.length) {
            roomsDB.addPlayerToRoom(id, newPlayer);
            addedToRoom = true;
            roomId = id;
        }
    });

    if(!addedToRoom) {
        roomId = roomsDB.openNewRoom(req.params.players);
        roomsDB.addPlayerToRoom(roomId, newPlayer);
    }

    res.json({room: roomsDB.getRoomById(roomId), player: newPlayer});
});

router.post('/room/:id', function(req, res, next) {
    let roomId = req.params.id;
    let room = roomsDB.getRoomById(roomId)

    if(room.players == room.playersList.length) {
        room.started = true;
        roomsDB.updateRoomById(roomId, room);
    }
    let player = req.body.player;
    playersDB.updatePlayerById(player.id, player);
    res.json({room, players: roomsDB.getAllPlayersInRoom(roomId)});
});

module.exports = router;