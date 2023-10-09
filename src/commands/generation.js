const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = new SlashCommandBuilder()
  .setName("generation")
  .setDescription("get generation data and it's member")
  .addSubcommand((subcommand) =>
    subcommand.setName("list").setDescription("list all generations")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("members")
      .setDescription("list members by generation")
      .addStringOption((option) =>
        option
          .setName("gen_name")
          .setDescription("generation name")
          .setRequired(true)
          .setChoices(
            {
              name: "Gen 0",
              value: "0",
            },
            {
              name: "Gen 2",
              value: "2",
            }
          )
      )
  )
  .toJSON();
