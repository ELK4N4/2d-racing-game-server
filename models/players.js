const { v4: uuidv4 } = require('uuid');
const NodeCache = require( "node-cache" );
const playersDB = new NodeCache();

const carColors = ['Red', 'Blue', 'Yellow', 'Black'];



function createNewPlayer() {
    let newPlayer = {
        id: uuidv4(),
        x: 0,
        y: 0,
        angle = 0,
        finished: false
    }
    playersDB.set(newPlayer.id, newPlayer);
    return newPlayer;
}


function addPlayerToRoom(roomId, player) {
    let room = roomsDB.get(roomId);
    room.playersList.push(player.id);
    roomsDB.set(roomId, room);

    player.color = carColors[room.playersList.length - 1];
    playersDB.set(player.id, player);
}

function updatePlayerById(playerId, updatedPlayer) {
    return playersDB.set(playerId, updatedPlayer);
}


module.exports.createNewPlayer = createNewPlayer;
module.exports.getAllRooms = addPlayerToRoom;
module.exports.updatePlayerById = updatePlayerById;