import './util/log';
import { parseArgs } from 'util';

const args = new Map();

(() => {
    const { values } = parseArgs({
        args: Bun.argv,
        options: {
            register_commands: {
                type: 'boolean',
            },
        },
        strict: true,
        allowPositionals: true,
    });

    Object.entries(values).forEach(([key, value]) => {
        args.set(key, value);
    });
})();

(() => {
    const requiredEnv = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];
    const missingEnv = requiredEnv.filter((env) => !process.env[env]);

    if (missingEnv.length) {
        console.error(
            `Missing required environment variables: ${missingEnv.join(
                ', '
            )}, exiting...`
        );
        process.exit(1);
    }
})();

if (args.has('register_commands')) {
    await import('./util/registerCommands');
    process.exit(0);
}

import { client } from './client';
client.login(process.env.DISCORD_TOKEN as string);
