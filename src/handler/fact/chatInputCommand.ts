const handleFact = (interaction, name) => {
  name ? interaction.reply(name) : interaction.reply(`done`);
};

export { handleFact };
