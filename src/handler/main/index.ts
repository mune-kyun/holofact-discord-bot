import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

import { getGenerationByIdName, getVtuberByName } from "../../api";

const mainHandleGenerationList = (interaction, selectedValue) => {
  getGenerationByIdName(selectedValue)
    .then((data: any) => {
      const { name, members } = data.generation;

      const buttons = members.map(({ name }) =>
        new ButtonBuilder()
          .setCustomId(`${name} Detail`)
          .setLabel(name)
          .setStyle(ButtonStyle.Primary)
      );
      const row = new ActionRowBuilder().addComponents(buttons);

      interaction.reply({
        content: `All **${name}** members`,
        components: [row] as any,
      });
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

const mainHandleVtuberDetail = (interaction, name) => {
  getVtuberByName(name)
    .then(({ vtuber }: any) => {
      const {
        name,
        nickname,
        imgUrl,
        birthday,
        greeting,
        height,
        funFacts,
        generation,
      } = vtuber;
      interaction.reply({
        content: `
        \nName: **${name}** 
        \nNicknames: **${nickname.join(", ")}**
        \nGeneration: **${generation.map(({ name }) => name).join(", ")}**
        \nBirthday: **${birthday}** 
        \nGreeting: **${greeting}** 
        \nHeight: **${height} cm**
        \nFun Fact: **${funFacts[0]}**
        \n${imgUrl}
        `,
      });
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { mainHandleGenerationList, mainHandleVtuberDetail };
