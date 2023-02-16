// fs is used to read the commands directory and identify our command files.
//const fs = require('node:fs');
// path helps construct paths to access files and directories.
//const path = require('node:path');
// Require the necessary discord.js classes
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config(); 
const TOKEN = process.env.TOKEN

// Create a new client instance
const client = new Client({ 
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on('ready', (c) => {
	console.log(`✅ ${c.user.tag} is online`)
});

// client.on('messageCreate', (message, event ='Banki Time', time = '9:00pm EST', date = 'March 10, 2023') => {
// 	if(message.author.bot){
// 		return;
// 	}
	
// 	if(message.content === 'Next Event'){
// 		message.reply(`Hey! The next event is ${event} on ${date} at ${time}`);
// 	}
// })

client.on('interactionCreate', (interaction) => {
	if(!interaction.isChatInputCommand()) return;

	if(interaction.commandName === 'embed') {
		const embed = new EmbedBuilder()
		.setTitle("Together")
		.setDescription("Link to the offical Together App")
		.setColor('0x0099FF')
		.setURL('https://together.cyclic.app')
		.setAuthor({name: 'Together', iconURL: 'https://ibb.co/VjsFGDg', url: 'https://together.cyclic.app'})
		.setThumbnail('https://ibb.co/VjsFGDg')
		.addFields(
			{ name: 'Field title', value: 'Some random value', inline: true },
			{ name: 'Field title2', value: 'Some random value2', inline: true }
		)
		.setImage('https://ibb.co/VjsFGDg')
		.setTimestamp()
		.setFooter({ text: 'Some footer text', iconURL: 'https://ibb.co/VjsFGDg' })

	interaction.reply({ embeds: [embed] });
	}
});

client.on('messageCreate', (message) => {
	if(message.content === 'embed'){
		const embed = new EmbedBuilder()
		.setTitle("Together")
		.setDescription("Link to the offical Together App")
		.setColor('0x0099FF')
		.setURL('https://together.cyclic.app')
		.setAuthor({name: 'Together', iconURL: 'https://ibb.co/VjsFGDg', url: 'https://together.cyclic.app'})
		.setThumbnail('https://ibb.co/VjsFGDg')
		.addFields(
			{ name: 'Field title', value: 'Some random value', inline: true },
			{ name: 'Field title2', value: 'Some random value2', inline: true }
		)
		.setImage('https://ibb.co/VjsFGDg')
		.setTimestamp()
		.setFooter({ text: 'Some footer text', iconURL: 'https://ibb.co/VjsFGDg' });

		message.channel.send({ embeds: [embed] })
	}
})

// Log in to Discord with your client's token
client.login(TOKEN);