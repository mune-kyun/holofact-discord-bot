const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = new SlashCommandBuilder()
  .setName("test")
  .setDescription("test connection")
  .toJSON();
