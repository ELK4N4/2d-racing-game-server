const ora = require('ora');
const chalk = require('chalk');
const boxen = require('boxen');
const logSymbols = require('log-symbols');
const cliSpinners = require('cli-spinners');
const ip = require('ip');
const { getLogo } = require('./logo');

const loader = ora({
    text: 'Shuting down',
    spinner: cliSpinners.material
});

const shutdown = () => {
    loader.start();
    setTimeout(() => {
        loader.stopAndPersist({
          symbol: logSymbols.success,
          text: "Done!",
        });
        process.exit(0);
    }, 1000 * 3);
}

const url = (PORT) => {
    console.log(chalk.bold(`http://${ip.address()}:${PORT}/`));
}

const clear = () => {
    process.stdout.write('\033[2J');
    console.clear();
}

const help = () => {
    console.log(
        boxen(`
                                ${chalk.bold.blue.underline('COMMANDS')}

${chalk.bold('[Command]')}                         ${chalk.bold('[Details]')} 
---------------------------------------------------------------------------------
logo                           |  Prints K300 logo :)
url                            |  Prints the current full url of the server  
clear                          |  Cleans the terminal
shutdown                       |  Shutdown the server
help                           |  Prints all commands`
      , {padding: 0, margin: 0, borderStyle: 'classic'}));
}

const logo = () => {
    console.log(getLogo());
}

const commands = {
    url,
    clear,
    shutdown,
    help,
    logo
}

module.exports.commands = commands;