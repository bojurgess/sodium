import { Collection } from 'discord.js';
import { client } from '../client';
import { join } from 'path';
import { readdirSync } from 'fs';

client.commands = new Collection();

const commandFolders = readdirSync(__dirname).filter(
    (item: string) => !item.endsWith('.ts')
);

for (const folder of commandFolders) {
    const commandsPath = join(__dirname, folder);
    const commandFiles = readdirSync(commandsPath).filter((file: string) =>
        file.endsWith('.ts')
    );
    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const commandModule = await import(filePath);
        const command = commandModule.default;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(
                `Command at ${filePath} is missing a required "data" or "execute" property. Skipping...`
            );
        }
    }
}
