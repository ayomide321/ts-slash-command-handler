import { Client } from 'discord.js'
import path from 'path'


module.exports = (client: Client) => {
    client.handleEvents = async (eventFiles: string[], path: string) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
             } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }        
    }   
}