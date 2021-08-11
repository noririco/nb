const cron = require("node-cron");
const { MessageEmbed } = require("discord.js");
const { RoleID, GuildID } = require("../_helpers/constants");
const { mentionByRoleId } = require("../_helpers/functions");
const logger = require("../logger");

async function battlecup(client) {
  logger.info(`[Routine] battlecup started..`);
  const battleCronDate = "0 20 * * 6";
  const guild = client.guilds.cache.get(GuildID);
  // logger.info(guild);
  const textChannels = guild.channels.cache.filter((c) => c.type === "text");
  cron.schedule(battleCronDate, () => {
    logger.info(`[Routine] cron.schedule ${battleCronDate}..`);
    textChannels.forEach(
      (c) => {
        logger.info(`[Routine] channel embed message ${c.name}..`);
        battleCupEmbededMessage(c);
        //   c.send("test");
      },
      {
        scheduled: true,
        timezone: "Asia/Jerusalem",
      }
    );
  });
}

async function battleCupEmbededMessage(channel) {
  const embed = await new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Battle Cup")
    //   .setURL("http://e-clubmalaysia.com/dota2/wp-content/uploads/battlecup_fall2016.png")
    .setAuthor(`NumAA Administration`)
    .setDescription(mentionByRoleId(RoleID.NumAA))
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .addFields({ name: "Try not to lose at first game", value: "play safe!" })
    .setImage(
      "https://e-clubmalaysia.com/dota2/wp-content/uploads/battlecup_fall2016.png"
    )
    .setTimestamp()
    .setFooter("Please be ready at 20:59!", "https://i.imgur.com/AfFp7pu.png");

  await channel.send(embed);
}

module.exports = {
  battlecup,
};
