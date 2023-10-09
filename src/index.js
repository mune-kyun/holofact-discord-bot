require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const { getVtuberByName, getGeneration } = require("./api");

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

  const { commandName, options } = interaction;

  if (commandName === "test") {
    interaction.reply("tested");
  }

  if (commandName === "vtuber") {
    const name = options.get("name").value;

    getVtuberByName(name)
      .then(({ vtuber }) => {
        interaction.reply(`**${vtuber.name}** is kawaii \ndesu`);
      })
      .catch((e) => {
        interaction.reply(`error occured`);
        console.log(e);
      });
  }

  if (commandName === "generation") {
    if (options.getSubcommand() === "list") {
      getGeneration()
        .then(({ generations }) => {
          let ret = ["*List of Generation* \n\n"];
          generations.map(({ name, idx }) =>
            idx + 1 == generations.length
              ? ret.push(`**${name}**`)
              : ret.push(`**${name}**\n`)
          );
          ret = ret.join("");

          interaction.reply(`${ret}`);
        })
        .catch((e) => {
          interaction.reply(`error occured`);
          console.log(e);
        });
    } else if (options.getSubcommand() === "members") {
      getGeneration()
        .then(({ vtuber }) => {
          interaction.reply(`**${vtuber.name}** is kawaii \ndesu`);
        })
        .catch((e) => {
          interaction.reply(`error occured`);
          console.log(e);
        });
    }
  }
});

client.login(process.env.TOKEN);
