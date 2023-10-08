require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const { getVtuberByName } = require("./api");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log("ready");
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "test") {
    interaction.reply("tested");
  }

  if (interaction.commandName === "vtuber") {
    const name = interaction.options.get("name").value;

    getVtuberByName(name)
      .then(({ vtuber }) => {
        interaction.reply(`${vtuber.name} is kawaii`);
      })
      .catch((e) => {
        interaction.reply(`error occured`);
        console.log(e);
      });
  }
});

client.login(process.env.TOKEN);
