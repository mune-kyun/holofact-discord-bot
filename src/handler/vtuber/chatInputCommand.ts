import { getVtuberByName } from "../../api";

const handleVtuber = (interaction, name) => {
  getVtuberByName(name)
    .then(({ vtuber }: any) => {
      interaction.reply(`**${vtuber.name}** is kawaii \ndesu`);
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { handleVtuber };
