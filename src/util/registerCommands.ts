import { REST, Routes } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';

export default async function registerCommands(): Promise<void> {
    const rest = new REST({ version: '10' }).setToken(
        process.env.DISCORD_TOKEN as string
    );

    const commands = [];
    const commandsPath = new URL('../commands', import.meta.url).pathname;
    const dirs = readdirSync(commandsPath).filter(
        (dir) => !dir.endsWith('.ts')
    );

    for (const dir of dirs) {
        const path = join(commandsPath, dir);
        const files = readdirSync(path).filter((file) => file.endsWith('.ts'));

        for (const file of files) {
            const filePath = join(path, file);

            const { default: command } = await import(filePath);

            if ('data' in command) {
                commands.push(command.data);
            } else {
                console.warn(
                    `Command at ${filePath} is missing a required "data" property. Skipping...`
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
}
