// fs is used to read the commands directory and identify our command files.
//const fs = require('node:fs');
// path helps construct paths to access files and directories.
//const path = require('node:path');
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config(); 
const TOKEN = process.env.TOKEN

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', (c) => {
	console.log(`✅ ${c.user.tag} is online`)
});

client.on('messageCreate', (message) => {
	console.log(message.content);
})

// Log in to Discord with your client's token
client.login(TOKEN);