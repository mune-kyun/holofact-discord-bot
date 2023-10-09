import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { getGeneration } from "../../api";

const handleGenerationList = (interaction) => {
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
};

const handleGenerationMembers = (interaction) => {
  getGeneration()
    .then(({ vtuber }: any) => {
      interaction.reply(`**${vtuber.name}** is kawaii \ndesu`);
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { handleGenerationList, handleGenerationMembers };
