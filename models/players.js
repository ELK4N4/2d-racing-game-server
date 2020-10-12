const { v4: uuidv4 } = require('uuid');
const NodeCache = require( "node-cache" );
const playersDB = new NodeCache();

function getAllPlayers(){
    let allPlayers = [];
    let playersKeys = playersDB.keys();

    playersKeys.forEach(id => {
        let player = playersDB.get(id);
        allPlayers.push(player);
    });
    return allPlayers;
}

function createNewPlayer() {
    let newPlayer = {
        id: uuidv4(),
        x: 0,
        y: 0,
        angle: 0,
        finished: false
    }
    playersDB.set(newPlayer.id, newPlayer);
    return newPlayer;
}


function updatePlayerById(playerId, updatedPlayer) {
    return playersDB.set(playerId, updatedPlayer);
}

module.exports.getAllPlayers = getAllPlayers;
module.exports.createNewPlayer = createNewPlayer;
module.exports.updatePlayerById = updatePlayerById;