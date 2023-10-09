import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { getGenerationByIdName } from "../../api";

const handleGenerationList = (interaction, selectedValue) => {
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

export { handleGenerationList };
