const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alert')
		.setDescription('Alert a specific user'),
	async execute(interaction) {
		if (!interaction.message) return interaction.reply('Could not read message');
		
		const user = interaction.message.mentions.users.first();
		console.log('Mentioned user:', user);
		if (!user) return interaction.reply('Please mention a user to send the alert to');

		try {
			await user.send(`This is a private alert from ${interaction.user.username}`);
			await interaction.reply(`Alert successfully sent to ${user.username}`);
		} catch (error) {
			console.log('Error:', error);
			await interaction.reply('Could not send alert, the user may have DMs disabled');
		}
	},
};
