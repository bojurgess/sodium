import { Events } from 'discord.js';
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
