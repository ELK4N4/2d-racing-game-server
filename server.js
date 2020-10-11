const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require( "node-cache" );
const { v4: uuidv4 } = require('uuid');

const roomsDB = new NodeCache();
const playersDB = new NodeCache();

const carColors = ['Red', 'Blue', 'Yellow', 'Black'];


// Set port
const PORT = process.env.PORT || 3000;


// Init app
const app = express();


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

function getAllRooms() {
    let allRooms = [];
    let roomsKeys = roomsDB.keys();
    roomsKeys.forEach(id => {
        let room = roomsDB.get(id);
        allRooms.push(room);
    });
    return allRooms;
}

function getAllPlayersInRoom(roomId) {
    let players = [];
    let room = roomsDB.get(roomId);
    room.playersList.forEach(id => {
        let player = playersDB.get(id);
        players.push(player);
    });
    return players;
}

function openNewRoom(players) {
    let roomId = uuidv4();
    let room = { 
        id: roomId,
        players: players,
        playersList: [],
        started: false
    };
    roomsDB.set(roomId, room);
    return roomId;
}

function addPlayerToRoom(roomId, player) {
    let room = roomsDB.get(roomId);
    room.playersList.push(player.id);
    roomsDB.set(roomId, room);

    player.color = carColors[room.playersList.length - 1];
    playersDB.set(player.id, player);
}



//////////////
app.get('/quick-match/:players', function(req, res, next) {

    let carInit = {
        id: uuidv4(),
        x: 0,
        y: 0,
        finished: false
    }

    success = playersDB.set(carInit.id, carInit);
    if(success) {
        let allRooms = roomsDB.keys();
        let roomId;
        addedToRoom = false;

        if(!allRooms) {
            roomId = openNewRoom(req.params.players);
            addPlayerToRoom(roomId, carInit);
            addedToRoom = true;
        } else {
            allRooms.forEach(id => {
                let room = roomsDB.get(id);
                if(room.players !== req.params.players) {
                    return;
                }
                if(room.players > room.playersList.length) {
                    addPlayerToRoom(id, carInit);
                    addedToRoom = true;
                    roomId = id;
                }
            });
            if(!addedToRoom) {
                roomId = openNewRoom( req.params.players);
                addPlayerToRoom(roomId, carInit);
            }
        }
        res.json({room: roomsDB.get(roomId), players: playersDB.keys(), player: carInit});
    } else {
        res.send("error");
    }
});

app.post('/room/:id', function(req, res, next) {
    let roomId = req.params.id;
    let room = roomsDB.get(roomId);

    console.log(room);

    if(room.players == room.playersList.length) {
        room.started = true;
        roomsDB.set(roomId, room);
    }
    let player = req.body.player;
    playersDB.set(player.id, player);
    res.json({room, players: getAllPlayersInRoom(roomId)});
});

////////////

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});