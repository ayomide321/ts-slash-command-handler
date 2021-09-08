/// <reference path="../discord.d.ts" />
import DiscordJS, { Intents, Collection, Client } from 'discord.js'
import fs from 'fs'
require('dotenv').config();

export const client: Client = new DiscordJS.Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const functions = fs.readdirSync('./src/functions').filter((file: string) => file.endsWith('.ts'));
const eventFiles = fs.readdirSync('./src/events').filter((file: string) => file.endsWith('.ts'));
const commandFolders = fs.readdirSync('./src/commands');


client.on('ready',  () => {
	console.log('Ready!')
	for (const  file of functions) {
		require(`./functions/${file}`)(client);
	}
	client.handleEvents(eventFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	
});


client.login(process.env.TOKEN);

