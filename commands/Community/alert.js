const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('alert')
    .setDescription('Alert a specific user')
    .build(),
  async execute(interaction) {
    const { message, args } = interaction;

    // Parse the command text to get the list of users
    const users = args.join(' ').split(' ');
	
    // Loop through the list of users
    for (const user of users) {
      try {
        // Look up the user by their mention or username
        const discordUser = message.mentions.users.first() || message.guild.members.cache.find(member => member.user.username === user);

        // Send the DM to the user
        const dmChannel = await discordUser.createDM();
        await dmChannel.send(`This is a DM from the bot.`);

        console.log(`Sent a DM to ${discordUser.username}`);
      } catch (error) {
        console.error(`Error sending DM to ${user}: ${error.message}`);
      }
    }
  },
};

