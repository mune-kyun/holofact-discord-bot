import { getVtuberByName } from "../../api";

const handleVtuberDetail = (interaction, name) => {
  getVtuberByName(name)
    .then(({ vtuber }: any) => {
      const { name, birthday, greeting, height } = vtuber;
      interaction.reply(
        `
        Name: **${name}** 
        \nBirthday: **${birthday}** 
        \nGreeting: **${greeting}** 
        \nHeight: **${height} cm** 
        `
      );
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { handleVtuberDetail };
