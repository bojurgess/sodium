import { Events, Collection } from 'discord.js';
import type { BaseInteraction } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} found.`
            );
            return;
        }

        const { cooldowns } = interaction.client;
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name) as Collection<
            string,
            number
        >;
        const defaultCooldown = 0;
        const cooldownAmount = (command.cooldown ?? defaultCooldown) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime =
                (timestamps.get(interaction.user.id) as number) +
                cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again in <t:${expiredTimestamp}:R>.`,
                    ephemeral: true,
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(
            () => timestamps.delete(interaction.user.id),
            cooldownAmount
        );

        try {
            await command.execute(interaction);
        } catch (error) {
            const message = 'There was an error while executing this command!';

            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: message,
                    ephemeral: true,
                });
            } else {
                await interaction.reply({ content: message, ephemeral: true });
            }
        }
    },
};
