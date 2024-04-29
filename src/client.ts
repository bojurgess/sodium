import { Client, Events, GatewayIntentBits } from 'discord.js';
import type { Client as BaseClient, Collection } from 'discord.js';

type C = BaseClient & {
    commands: Collection<string, any>;
};

export const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as C;

client.once(Events.ClientReady, (c) => {
    console.info(`Logged in as ${c.user?.tag}`);
});
