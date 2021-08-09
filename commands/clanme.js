const { RoleID } = require("../_helpers/constants");
const {
  getMemberFromMention,
  hasRole,
  removeRoleById,
  addRoleById,
} = require("../_helpers/functions");
const logger = require("../logger");
/**
 * Permission: Manage Roles
 */
module.exports = {
  name: "clanme",
  description: "add a clan member role to a member",
  execute(message, args, Discord) {
    if (hasRole(message.member, RoleID.Admin)) {
      const member = getMemberFromMention(args[0], message.client);
      if (!member) {
        return message.channel.send(
          "Please use a proper mention if you want to ban someone."
        );
      }
      if (hasRole(member, RoleID.NumAA)) {
        removeRoleById(member, RoleID.NumAA);
        return message.channel.send(
          `<@${member.id}> you are no longer a NumAA!`
        );
      } else {
        addRoleById(member, RoleID.NumAA);
        return message.channel.send(`<@${member.id}> you are now a NumAA!`);
      }
    }
  },
};
