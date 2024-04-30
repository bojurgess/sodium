import { REST, Routes } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';

const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN as string
);

const commands = [];
const commandFolders = readdirSync(__dirname).filter(
    (item: string) => !item.endsWith('.ts')
);

for (const folder of commandFolders) {
    const commandsPath = join(__dirname, folder);
    const commandFiles = readdirSync(commandsPath).filter((file: string) =>
        file.endsWith('.tss')
    );
    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const commandModule = await import(filePath);
        const command = commandModule.default;
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.warn(
                `The command at ${filePath} is missing a required "data" or "execute" property. Skipping...`
            );
        }
    }
}

try {
    console.log(
        `Started refreshing ${commands.length} application (/) commands.`
    );
    await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
        { body: commands }
    );
    console.info('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error('Failed to reload application (/) commands.', error);
}
