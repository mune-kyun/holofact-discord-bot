const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = new SlashCommandBuilder()
  .setName("fact")
  .setDescription("get random fact from any vtuber")
  .addStringOption((option) =>
    option.setName("name").setDescription("name of vtuber").setRequired(false)
  )
  .toJSON();
