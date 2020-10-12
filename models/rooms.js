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

function getRoomById(roomId) {
    return roomsDB.get(roomId);
}

function updateRoomById(roomId, updatedRoom) {
    return roomsDB.set(roomId, updatedRoom);
}

module.exports.getAllRooms = getAllRooms;
module.exports.openNewRoom = openNewRoom;
module.exports.getAllRooms = getAllPlayersInRoom;
module.exports.getRoomById = getRoomById;
module.exports.updateRoomById = updateRoomById;