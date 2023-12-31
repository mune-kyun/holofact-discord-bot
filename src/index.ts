require("dotenv").config();
import { Client, IntentsBitField } from "discord.js";

import {
  handleGenerationList,
  handleGenerationMembers,
} from "./handler/generation/chatInputCommand";
import { handleVtuber } from "./handler/vtuber/chatInputCommand";
import { handleGenerationList as handleSelectGenerationList } from "./handler/generation/stringSelectMenu";
import { handleVtuberDetail } from "./handler/vtuber/button";
import { handleFact } from "./handler/fact/chatInputCommand";

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
        const gen = options.get("gen_name").value;
        handleGenerationMembers(interaction, gen);
      }
    }

    if (commandName === "fact") {
      const name = options.get("name") ? options.get("name").value : null;
      handleFact(interaction, name);
    }
  } else if (interaction.isStringSelectMenu()) {
    const { commandName } = interaction.message.interaction;

    if (commandName == "generation list") {
      const selectedValue = interaction.values[0];
      handleSelectGenerationList(interaction, selectedValue);
    }
  } else if (interaction.isButton()) {
    const { customId } = interaction;

    if (customId.includes("Detail")) {
      handleVtuberDetail(interaction, customId.replace(" Detail", ""));
    }
  }
});

client.login(process.env.TOKEN);
