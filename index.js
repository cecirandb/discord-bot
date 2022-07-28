require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Partials,
  ActivityType,
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
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "mhelp 😎 M150",
        type: ActivityType.Watching,
      },
    ],
  }); // online, idle, invisible, dnd

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

  if (content.startsWith(prefix) && content.includes("150")) {
    await message.channel.send(`El mejor discord del mundo, por? 💖`);
  }

  if (content.startsWith(prefix) && content.includes("emojis")) {
    const reactions = await message.reply({
      content: "Reacting with emojis!",
      fetchReply: true,
    });
    Promise.all([
      reactions.react("🤡"),
      reactions.react("🧐"),
      reactions.react("🤠"),
    ]).catch((error) =>
      console.error("One of the emojis failed to react:", error)
    );
  }

  if (content.startsWith(prefix) && content.includes("hay")) {
    message.react("😄").then(() => message.react("😢"));

    const filter = (reaction, user) => {
      return (
        ["😄", "😢"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    message
      .awaitReactions({ filter, max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();

        if (reaction.emoji.name === "😄") {
          message.reply("Eaaaaaaaaa😎.");
        } else if (reaction.emoji.name === "😢") {
          message.reply(
            "https://www.youtube.com/watch?v=ymvYySd_P2E to make you feel better😚"
          );
        }
      })
      .catch((c) => {
        message.reply("Don't react in time🤨");
      });
  }

  if (content.startsWith(prefix) && content.includes("help")) {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`Available commands🧐`)
      .setDescription("🛠 New commands coming soon 🛠")
      .addFields(
        { name: "• m ping", value: "Command for testing only." },
        { name: "• m avatar", value: "See your avatar." },
        { name: "• m test", value: "Command for testing only." },
        {
          name: "• m clean",
          value: "Command to delete the last five messages.",
        },
        {
          name: "• m hay",
          value: "How Are You? Command.",
        }
      )
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
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

  // Deleting 5 messages
  if (content.startsWith(prefix) && content.includes("clean")) {
    async function clear() {
      try {
        // await msg.delete();
        const fetched = await message.channel.messages
          .fetch({
            limit: 5,
          })
          .then((messages) => {
            return messages;
          });
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
