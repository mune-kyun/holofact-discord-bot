import { getGenerationByIdName } from "../../api";

const handleGenerationList = (interaction, selectedValue) => {
  getGenerationByIdName(selectedValue)
    .then((data: any) => {
      const { name, members } = data.generation;
      interaction.reply(
        `**${name}** is kawaii \ndesu consist of ${members[0].name}`
      );
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { handleGenerationList };
