const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require( "node-cache" );
const rooms = new NodeCache();
const cars = new NodeCache();
const { v4: uuidv4 } = require('uuid');


// Set port
const PORT = process.env.PORT || 3000;


// Init app
const app = express();


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


function openNewRoom(players) {
    let roomId = uuidv4();
    let room = { 
        players: players,
        playersList: []
    };
    rooms.set(roomId, room);
    return roomId;
}

function addPlayerToRoom(roomId, playerId) {
    let room = rooms.get(roomId);
    room.playersList.push(playerId);
    rooms.set(roomId, room);
}

//////////////
app.get('/quick-match/:players', function(req, res, next) {

    let carInit = {
        id: uuidv4(),
        x: 0,
        y: 0,
        finished: false
    }

    success = cars.set(carInit.id, carInit);
    if(success) {
        let allRooms = rooms.keys();
        let roomId;
        addedToRoom = false;

        if(!allRooms) {
            roomId = openNewRoom(req.params.players);
            addPlayerToRoom(roomId, carInit.id);
            addedToRoom = true;
        } else {
            allRooms.forEach(id => {
                let room = rooms.get(id);
                if(room.players !== req.params.players) {
                    return;
                }
                if(room.players > room.playersList.length) {
                    addPlayerToRoom(id, carInit.id);
                    addedToRoom = true;
                    roomId = id;
                }
            });
            if(!addedToRoom) {
                roomId = openNewRoom( req.params.players);
                addPlayerToRoom(roomId, carInit.id);
            }
        }
        res.json({room: rooms.get(roomId), cars: cars.keys(), carInit});
    } else {
        res.send("error");
    }
});

app.post('/quick-match', function(req, res, next) {
    let id = req.body.id;
});

////////////

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});