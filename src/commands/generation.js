const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = new SlashCommandBuilder()
  .setName("generation")
  .setDescription("get generation data and it's member")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("name of vtuber")
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
  .toJSON();
