/**
 * https://github.com/BlackKnight683/Tickety/issues/1
 */

const { RoleID } = require("../_helpers/constants");
const { getRoleById, mentionByRoleId } = require("../_helpers/functions");
const logger = require("../logger");
module.exports = {
  name: "battlecup",
  description: "embed message in a discord channel",
  execute(client, message, args, Discord) {
    // const fetchUser = async id => Discord.client.users.fetch(id)
    // const user = message.guild.members.cache.get(`346774988449251328`);
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Battle Cup")
      //   .setURL("http://e-clubmalaysia.com/dota2/wp-content/uploads/battlecup_fall2016.png")
      .setAuthor(`${message.author.username}`)
      .setDescription(mentionByRoleId(RoleID.NumAA))
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields({ name: "Try not to lose at first game", value: "play safe!" })
      .setImage(
        "https://e-clubmalaysia.com/dota2/wp-content/uploads/battlecup_fall2016.png"
      )
      .setTimestamp()
      .setFooter(
        "Please be ready at 20:59!",
        "https://i.imgur.com/AfFp7pu.png"
      );

    message.channel.send(embed);
  },
};
