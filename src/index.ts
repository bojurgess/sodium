import './util/log';
import { checkArgs, checkEnv, registerCommands } from './util';
import { Events } from 'discord.js';

const args = checkArgs();
checkEnv();

if (args.has('register_commands')) {
    await registerCommands();
    process.exit(0);
}

const { client } = await import('./client');
const { initialiseHandlers } = await import('./util/initialiseHandlers');
await initialiseHandlers();

client.login(process.env.DISCORD_TOKEN as string);
