import { getVtuberByName } from "../../api";

const mainHandleVtuberDetail = (interaction, name) => {
  getVtuberByName(name)
    .then(({ vtuber }: any) => {
      const { name, imgUrl, birthday, greeting, height } = vtuber;
      interaction.reply(
        `
        \nName: **${name}** 
        \nBirthday: **${birthday}** 
        \nGreeting: **${greeting}** 
        \nHeight: **${height} cm**
        \n${imgUrl}
        `
      );
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { mainHandleVtuberDetail };
