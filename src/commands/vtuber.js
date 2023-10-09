const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = new SlashCommandBuilder()
  .setName("vtuber")
  .setDescription("get vtuber data")
  .addStringOption((option) =>
    option.setName("name").setDescription("name of vtuber").setRequired(true)
  )
  .toJSON();
