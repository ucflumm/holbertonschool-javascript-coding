const name = "Welcome to Holberton School, what is your name? \n";
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question(name, (name) => {
  console.log(`Your name is: ${name}`);
  rl.close();
}
);
rl.on('close', () => {
  console.log('This important software is now closing');
  process.exit();
});
