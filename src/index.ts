import './util/log';
import { checkArgs, checkEnv, registerCommands } from './util';

const args = checkArgs();
checkEnv();

if (args.has('register_commands')) {
    registerCommands();
    process.exit(0);
}

import { client } from './client';
client.login(process.env.DISCORD_TOKEN as string);
