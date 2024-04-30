import { Collection } from 'discord.js';
import { client } from '../client';
import { join } from 'path';
import { readdirSync } from 'fs';

client.commands = new Collection();

const dirs = readdirSync(__dirname).filter(
    (item: string) => !item.endsWith('.ts')
);

for (const dir of dirs) {
    const path = join(__dirname, dir);
    const files = readdirSync(path).filter((file: string) =>
        file.endsWith('.ts')
    );
    for (const file of files) {
        const filePath = join(path, file);
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
