const dotenv = require('dotenv');
dotenv.config();
const { REST, Routes } = require('discord.js')

const commands = [
    {
        name: 'embed',
        description: 'Sends an embed!'
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {

        console.log(`Registering ${commands.length} slash commands`)

        await rest.put(
            Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
            { body:commands }
        )

        console.log(`Slash commands were registered successfully!`)
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();

// node functions/handleCommands
