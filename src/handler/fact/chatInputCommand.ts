import { getFact } from "../../api";

const handleFact = (interaction, name) => {
  getFact(name)
    .then(({ fact }) => {
      const { name, funFacts } = fact;

      interaction.reply({
        content: `
        \n**${name}** 
        \n${funFacts} 
        `,
      });
    })
    .catch((e) => {
      interaction.reply(`error occured`);
      console.log(e);
    });
};

export { handleFact };
