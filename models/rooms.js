const { v4: uuidv4 } = require('uuid');
const NodeCache = require( "node-cache" );
const roomsDB = new NodeCache();

function getAllRooms() {
    let allRooms = [];
    let roomsKeys = roomsDB.keys();

    roomsKeys.forEach(id => {

        let room = roomsDB.get(id);

        allRooms.push(room);
    });
    return allRooms;
}

function getAllPlayersIdInRoom(roomId) {
    let players = [];
    let room = roomsDB.get(roomId);
    room.playersList.forEach(id => {
        let player = playersDB.get(id);
        players.push(player);
    });
    return players;
}

function openNewRoom(maxPlayers) {
    let roomId = uuidv4();
    let room = { 
        id: roomId,
        maxPlayers: maxPlayers,
        playersList: [],
        gameStarted: false
    };
    roomsDB.set(roomId, room);
    return roomId;
}


function addPlayerToRoom(roomId, player) {
    let room = roomsDB.get(roomId);
    room.playersList.push(player.id);
    roomsDB.set(roomId, room);
}

function getRoomById(roomId) {
    return roomsDB.get(roomId);
}

function updateRoomById(roomId, updatedRoom) {
    return roomsDB.set(roomId, updatedRoom);
}

module.exports.getAllRooms = getAllRooms;
module.exports.openNewRoom = openNewRoom;
module.exports.getAllPlayersIdInRoom = getAllPlayersIdInRoom;
module.exports.addPlayerToRoom = addPlayerToRoom;
module.exports.getRoomById = getRoomById;
module.exports.updateRoomById = updateRoomById;