import {Command} from 'commander';

const program = new Command();

program
    .option('-d','debug', false)
    .option('-p, --port <port>', 'Port to run the server on', 3000)
    .option('--mode <mode>', 'Mode to run the server on', 'development')
program.parse();


console.log('Option', program.opts());
console.log('Option - Mode: ', program.opts().mode);
console.log('Option - Port: ', program.opts().p);


export default program;