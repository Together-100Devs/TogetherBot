// fs is used to read the commands directory and identify our command files.
const fs = require('node:fs');
// path helps construct paths to access files and directories.
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config(); 
const TOKEN = process.env.TOKEN

// Create a new client instance
// the bot is subscribing to the Guilds intent, which allows it to receive information about the guilds (servers) 
// it is a member of. This includes things like guild name, member count, and channel information.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//.commands property to your client instance so that you can access your commands in other files
// The Collection class extends JavaScript's native Map class, and includes more extensive, useful functionality. 
// Collection is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

// path.join() helps to construct a path to the commands
const commandsPath = path.join(__dirname, 'commands');
// The fs.readdirSync() method then reads the path to the directory and returns an array of all the file names it contains
// Array.filter() removes any non-JavaScript files from the array.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// a listener for the Client#event:interactionCreate event that will execute code when your application receives an interaction
client.on(Events.InteractionCreate, async interaction => {
	// Make sure to only handle slash commands in this function by making use of the BaseInteraction#isChatInputCommand method 
	// to exit the handler if another type is encountered.
	if (!interaction.isChatInputCommand()) return;
	//console.log(interaction);
	const command = interaction.client.commands.get(interaction.commandName);

	// If no matching command is found, log an error to the console and ignore the event.
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	// In case something goes wrong, catch and log any error to the console.
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(TOKEN);