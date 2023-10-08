require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { request, gql } = require("graphql-request");

const token =
  "MTE2MDE5ODE4NzY4OTE4NTM0Mg.GlAswS.v55BACPxbb9i9iACTTalPC-Gh8wj2NgsV30tGE";

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

  if (interaction.commandName === "talent") {
    const name = interaction.options.get("name").value;

    const document = gql`
      {
        vtubers {
          name
        }
      }
    `;

    (async () => {
      const res = await request("http://localhost:4000/graphql/", document);
      console.log(res);
    })();

    interaction.reply(`${name} is kawaii`);
  }
});

client.login(process.env.TOKEN);
