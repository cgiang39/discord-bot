const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
bot.login(auth.token);

//FILESYNC
const fs = require('fs');
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


const modRole = 'Admin';
const prefix = '>';

//Listener Event: Runs whenever a message is received. 
bot.on('message', message => {
    let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

    let msg = message.content.toLowerCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" "); // slices off prefix, stores rest into array split by spaces
    let args = cont.slice(1); // removes the command part of the message

    if (msg === prefix + 'adel'){
        message.channel.send('TRI BEAM CANNON <:shinhaha:295268049718870017>');
    }
    
    if (msg === prefix + 'luis'){
        message.channel.send('No te NOJES CUH! <:mrlauro:295279659447484417>');
    }

    if (msg.startsWith(prefix+'removepd')){
        //message.channel.send('hi' + cont);
        //Check if they have Admin role
        if(!message.member.roles.find("name", modRole)){
            message.channel.send('You need to be an ' + modRole + ' to use this command.');
        }
        else{
            //message.channel.send('Charlie it works');
        }
        
        //Check if they defined an amount
        if(!args[0]){
            message.channel.send('You must define an amount. Usage: >removepd <amount> <user>');
        }

        //Check if they defined a user
        let definedUser = '';
        if (!args[1]){
            definedUser = message.author.id;
        }
        else {
            message.channel.send('It works cuh');
            let firstMentioned = message.mentions.users.first();
            definedUser = firstMentioned.id;
            
        }

        userData[sender.id + message.guild.id].money -= args[0];


    }


    //EVENTS
    if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
    if(!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.err(err);
    })

    //MONEY
    if(msg === prefix + 'pd' || msg === prefix + 'pokedollars'){
        message.channel.send({"embed":{
            title: (message.author.username + "'s Wallet"),
            color: 0xF1C40F,
            fields:[{
                name:"Pokedollars",
                value:userData[sender.id + message.guild.id].money,
                inline:true
            }]
        }})
    }

});

//Ready Event: Runs whenever the bot sends a ready event. (e.g. when it first starts)
bot.on('ready', () => {
    console.log('Bot started.')
})








// const logger = require('winston');
// const auth = require('./auth.json');

// var fs = require('fs');

// var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8')); // Calls userData.json


// // Configure logger settings
// logger.remove(logger.transports.Console);
// logger.add(new logger.transports.Console, {
//     colorize: true
// });
// logger.level = 'debug';
// // Initialize Discord Bot
// var bot = new Discord.Client({
//    token: auth.token,
//    autorun: true
// });
// bot.on('ready', function (evt) {
//     logger.info('Connected');
//     logger.info('Logged in as: ');
//     logger.info(bot.username + ' - (' + bot.id + ')');
// });
// bot.on('message', function (user, userID, channelID, message, evt) {

//     let sender = message.author;

//     //MONEY
//     if (!userData[sender.id + message.guild.id]){
//         userData[sender.id +message.guild.id] = {}; // creates json for user.guild if not already present
//     }
    
//     if(!userData[sender.id + message.guild.id]){
//         userData[sender.id + message.guild.id].pokedollars = 1000; //create money object
//     }

//     fs.writeFile('Storage/userData.json', JSON.stringify(userData), err);

//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `%`
//     if (message.substring(0, 1) == '%') {
//         var args = message.substring(1).split(' ');
//         var cmd = args[0];
       
//         args = args.splice(1);
//         switch(cmd) {
//             // !ping
//             case 'sad':
//                 bot.sendMessage({
//                     to: channelID,
//                     message: 'No te AGUITES CUH!'
//                 });
//             break;
// 			case 'luis':
// 				bot.sendMessage({
// 					to: channelID,
// 					message: 'No te NOJES CUH! <:mrlauro:295279659447484417>'
// 				});
// 			break;
// 			case 'adel':
// 				bot.sendMessage({
// 					to: channelID,
// 					message: 'TRI BEAM CANNON <:shinhaha:295268049718870017>'
// 				});
// 			break;
//             // Just add any case commands if you want to..
//          }
//      }
// });