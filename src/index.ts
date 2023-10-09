require("dotenv").config();
import {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";

import { getVtuberByName, getGeneration } from "./api";

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

      getVtuberByName(name)
        .then(({ vtuber }: any) => {
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
          .then(({ generations }: any) => {
            let retList: any = ["*List of Generation* \n\n"];
            generations.map(({ name, idx }) =>
              idx + 1 == generations.length
                ? retList.push(`**${name}**`)
                : retList.push(`**${name}**\n`)
            );
            retList = retList.join("");

            const options = generations.map(({ idName, name }) => ({
              label: name,
              value: idName,
            }));
            const menuMessage = "Member list for each generations";
            const row = new ActionRowBuilder().addComponents(
              new StringSelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                .addOptions(options)
            );

            interaction.reply({
              content: `${retList}\n${menuMessage}`,
              components: [row] as any,
            });
          })
          .catch((e) => {
            interaction.reply(`error occured`);
            console.log(e);
          });
      } else if (options.getSubcommand() === "members") {
        getGeneration()
          .then(({ vtuber }: any) => {
            interaction.reply(`**${vtuber.name}** is kawaii \ndesu`);
          })
          .catch((e) => {
            interaction.reply(`error occured`);
            console.log(e);
          });
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    const selectedValue = interaction.values[0];

    interaction.reply(selectedValue);
  }
});

client.login(process.env.TOKEN);
