const express = require('express');
const bodyParser = require('body-parser');

const logSymbols = require('log-symbols');
const cliSpinners = require('cli-spinners');
const ora = require('ora');
const ip = require('ip');
const boxen = require('boxen');
const chalk = require('chalk');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Set port
let PORT = process.env.PORT || 3000;

// Init app
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Import routes
const apiRouter = require('./routes/api.js');

// Middlewares
app.use('/api', apiRouter);

process.stdout.write('\033[2J');
console.clear();
const logo = `
 _  __  _____    ___     ___  
| |/ / |___ /   / _ \\   / _ \\ 
| ' /    |_ \\  | | | | | | | |
| . \\   ___) | | |_| | | |_| |
|_|\\_\\ |____/   \\___/   \\___/ 
                              
`;
console.log(
  chalk.blue(
    boxen(logo, {padding: 1, margin: 0, borderStyle: 'round'})
  )
);


app.listen(PORT, '0.0.0.0', () => {
      console.log();
      console.log(chalk.bold.blue(logSymbols.success + ' The server is running'));
      console.log();
      console.log(chalk.bold(`Your server ip:`));
      console.log(ip.address());
      console.log();
      console.log(chalk.bold(`Your full url server address:`));
      console.log(`http://${ip.address()}:${PORT}/`);
      console.log();
      
      process.stdout.write("> ");
    });
 
  
  rl.on('line', function(line) {
    switch(line.trim()) {
      case 'help':
        console.log(
          boxen(`
                                  ${chalk.bold.blue.underline('COMMANDS')}

  ${chalk.bold('[Command]')}                         ${chalk.bold('[Details]')} 
---------------------------------------------------------------------------------
  url                            |  Printing the current full url of the server  
  clean                          |  Cleaning terminal
  shutdown                       |  Shutdowning the server
  help                           |  Printing all commands`
        , {padding: 0, margin: 0, borderStyle: 'classic'}));
        break;
      case 'url':
        
        console.log(chalk.bold(`http://${ip.address()}:${PORT}/`));
        break;
      case 'clean':
        process.stdout.write('\033[2J');
        console.clear();
      break;
      case 'shutdown':
        const loader = ora({
          text: 'Shuting down',
          spinner: cliSpinners.material
        }).start();
        setTimeout(() => {
          loader.stopAndPersist({
            symbol: logSymbols.success,
            text: "Done!",
          });
          process.exit(0);
        }, 1000 * 3);
        break;
      default:
        console.log('unknown command `' + line.trim() + '`');
        break;
    }
    rl.setPrompt("> ");
    rl.prompt();
});
