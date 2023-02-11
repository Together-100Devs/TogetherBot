const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

const dotenv = require('dotenv');
dotenv.config();

//const guildId = process.env.guildId
const clientId = process.env.clientId

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (const folder of commandFolders) {
            const commandFiles = fs.readFileSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON())
            }
        }

        const rest = new REST ({
            version: '10'
        }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.log(error);
            }
        })();
    };
};