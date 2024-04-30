import { Client, Events, GatewayIntentBits } from 'discord.js';

export const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (c) => {
    console.info(`Logged in as ${c.user?.tag}`);
});
