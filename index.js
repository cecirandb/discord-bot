const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Partials,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

// Bot listenning messages
client.on("ready", () => {
  console.log("Bot Now connected!");
  console.log("Logged In as", client.user.tag);
  client.user.setStatus("online"); // online, idle, invisible, dnd

  console.log(`Bot status: ${client.user.presence.status}`);

  //const testChannel = client.channels.cache.find((x) => x.name === "bottest").send('Hello Server!');
  //console.log(testChannel);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (content === "ping") {
    await message.reply(`pong`);
  }

  if (content === "hola") {
    await message.channel.send(`Hola ${message.author}`);
  }

  if (content === "avatar") {
    const embed = new EmbedBuilder()
      .setColor(0xffe8e0)
      .setTitle("name")
      .setDescription("Avatar URL")
      .setImage(message.author.displayAvatarURL({ size: 2048, dynamic: true }))
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }

  if (content.includes("!test")) {
    await message.channel.send("Glad you are testing");
  }

  // Deleting 100 messages
  if (content.startsWith("!clean123")) {
    async function clear() {
      try {
        // await msg.delete();
        const fetched = await message.channel.fetchMessages({ limit: 99 });
        message.channel.bulkDelete(fetched);
        console.log("Messages deleted");
      } catch (e) {
        console.log(e);
      }
    }
    clear();
  }
});

client.on("error", (err) => {
  console.log(err.message);
});

const token =
  "MTAwMDU1MDYwODI5OTg5Njg1Mg.GIilh8.VPqh2n-WACZcaoQN6-VkYEYCfWdiS2cIexABj8"; // old token
client.login(token);
