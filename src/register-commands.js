require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "test",
    description: "test connection",
  },
  {
    name: "talent",
    description: "get talent data",
    options: [
      {
        name: "name",
        description: "name of vtuber",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("register commands");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("success registering commands");
  } catch (error) {
    console.log(`error is ${error}`);
  }
})();
