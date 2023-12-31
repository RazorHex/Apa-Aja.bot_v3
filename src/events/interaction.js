const { codeBlock, CommandInteraction, Events } = require("discord.js");
const { registered } = require("../components/slashcommand");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = registered.get(interaction.commandName);

      // Unknown command
      if (!command) {
        return await interaction.reply({
          ephemeral: true,
          content: codeBlock("404 Error: Unknown command"),
        });
      }

      // Known command
      try {
        await command.execute(interaction);
      } catch (e) {
        console.log(e);
        if (interaction.isRepliable()) {
          return interaction.reply({
            content: "An error has occured. Please contact admin.",
          });
        } else {
          return interaction.editReply({
            content: "An error has occured. Please contact admin.",
          });
        }
      }
    } else if (interaction.isStringSelectMenu()) {
      const { customId, member, values, guildId } = interaction;
      switch (customId) {
        case "role":
          const role = await interaction.guild.roles.fetch(values[0]);
          member.roles.cache.some((r) => r.name === role.name)
            ? member.roles.remove(role)
            : member.roles.add(role);

          interaction.update({ content: " " });
          break;

        default:
          break;
      }
    }
  },
};
