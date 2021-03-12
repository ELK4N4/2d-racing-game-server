const ip = require('ip');
const { getLogo } = require('./logo');
const { commands } = require('./commands');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function clearTerminal() {
    process.stdout.write('\033[2J');
    console.clear();
}

function welcomeScreen(PORT) {
    clearTerminal();
    console.log(getLogo());

    console.log();
    console.log(chalk.bold.blue(logSymbols.success + ' The server is running'));
    console.log();
    console.log(chalk.bold(`Your ip:`));
    console.log(ip.address());
    console.log();
    console.log(chalk.bold(`Your full url server address:`));
    console.log(`http://${ip.address()}:${PORT}/`);
    console.log();
    console.log(`For more commands type "help"`);

    process.stdout.write("> ");
}

function inputListener(PORT) {
    rl.on('line', function(line) {
        let input = line.trim();
        let commandFunction = commands[input];
        if(commandFunction) {
          commandFunction(PORT);
        } else {
          console.log(`unknown command "${input}"`);
        }
        rl.setPrompt("> ");
        rl.prompt();
    }); 
}

function cli(PORT) {
    welcomeScreen(PORT);
    inputListener(PORT);
}

module.exports.cli = cli;