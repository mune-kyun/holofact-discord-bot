require("dotenv").config();
import { Client, IntentsBitField } from "discord.js";

import {
  handleGenerationList,
  handleGenerationMembers,
} from "./handler/generation/chatInputCommand";
import { handleVtuber } from "./handler/vtuber/chatInputCommand";
import { handleYou } from "./handler/generation/stringSelectMenu";

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
  if (interaction.isChatInputCommand()) {
    const { commandName, options } = interaction;

    if (commandName === "test") {
      interaction.reply("tested");
    }

    if (commandName === "vtuber") {
      const name = options.get("name").value;
      handleVtuber(interaction, name);
    }

    if (commandName === "generation") {
      if (options.getSubcommand() === "list") {
        handleGenerationList(interaction);
      } else if (options.getSubcommand() === "members") {
        handleGenerationMembers(interaction);
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    const selectedValue = interaction.values[0];
    handleYou(interaction, selectedValue);
  }
});

client.login(process.env.TOKEN);
