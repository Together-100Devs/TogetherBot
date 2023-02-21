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

client.on('interactionCreate', (interaction) => {
	if(!interaction.isChatInputCommand()) return;

	if(interaction.commandName === 'embed') {
		const embed = new EmbedBuilder()
		.setTitle("Together")
		.setDescription("Alert members for event")
		.setColor('0x0099FF')
		.setURL('https://together.cyclic.app')
		.setAuthor({name: 'Together', iconURL: 'https://i.ibb.co/qyvH89N/logoicon.png', url: 'https://together.cyclic.app'})
		.setThumbnail('https://i.ibb.co/qyvH89N/logoicon.png')
		.addFields(
			{ name: 'Field title', value: 'Some random value', inline: true },
			{ name: 'Field title2', value: 'Some random value2', inline: true }
		)
		.setImage('https://i.ibb.co/qyvH89N/logoicon.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text', iconURL: 'https://i.ibb.co/qyvH89N/logoicon.png' })


// For sending DMS to ALL users in the discord. Also uncomment line 77.

// Get the guild from the interaction
// const guild = client.guilds.cache.get(interaction.guildId);

// Get all members in the guild
// const members = guild.members.cache;

// Loop through each member and send the embed
// members.forEach((member) => {
//   // Check if the member is a bot or the command author
// if (member.user.bot || member.user.id === interaction.user.id) {
//     return;
// }

// Send the embed to the member's DMs
// member.user.send({ embeds: [embed] })
//     .catch((error) => {
//     console.error(`Failed to send message to ${member.user.username}: ${error}`);
//     });
// });

// Testing for just for who initiates the slash command //////////////////
		let user = client.users.cache.find(
			(user) => user.id === interaction.user.id
		);
		user.send({embeds: [embed]});

	interaction.reply({ content : 'Message sent!' });
	}
//////////////////////////////////////////////////////////////////////////
	// For sending DMS to ALL users in the discord 
	// interaction.reply({ content : 'Message sent!' });
});

// Log in to Discord with your client's token
client.login(TOKEN);