const chalk = require('chalk');
const boxen = require('boxen');

const LOGO = `
 _  __  _____    ___     ___  
| |/ / |___ /   / _ \\   / _ \\ 
| ' /    |_ \\  | | | | | | | |
| . \\   ___) | | |_| | | |_| |
|_|\\_\\ |____/   \\___/   \\___/ 
                             
`;

const getLogo = () => {
    return chalk.blue(boxen(LOGO, {padding: 1, margin: 0, borderStyle: 'round'}));
};
  
module.exports.getLogo = getLogo;