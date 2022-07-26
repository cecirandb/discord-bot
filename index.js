require("dotenv").config();

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

const dstoken = process.env.DISCORD_TOKEN;

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
  let prefix = "m";

  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (content.startsWith(prefix) && content.includes("ping")) {
    await message.reply(`pong`);
  }

  if (content.startsWith(prefix) && content.includes("twitch")) {
    await message.channel.send(`Twitch https://www.twitch.tv/ceecid 💖`);
  }

  if (content.startsWith(prefix) && content.includes("avatar")) {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`✨ ${message.author.username}`)
      .setDescription("command create by ceecid")
      .setImage(message.author.displayAvatarURL({ size: 2048, dynamic: true }))
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }

  if (content.includes("m test")) {
    await message.reply("Glad you are testing");
  }

  // Deleting 100 messages
  if (content.startsWith("m clean123")) {
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

client.login(dstoken);
