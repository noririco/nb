const fs = require("fs");
const path = require("path");
const { GuildID, BOT_PREFIX } = require("./constants");
const logger = require("../logger");
function mentionByRoleId(id) {
  return `<@&${id}>`;
}
function mentionByMemberId(id) {
  return `<@!${id}>`;
}
function setCommands(dir, client) {
  const commandFiles = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const p = path.join("..", "commands", file);
    const command = require(p);
    client.commands.set(command.name, command);
  }
}
function parseMessage(message) {
  //   logger.info(message.content);
  const _message = message.content.trim();

  const args = _message.slice(BOT_PREFIX.length).split(/\s+/);
  const command = args.shift().toLocaleLowerCase();
  return { command, args };
}
function hasRole(member, roleId) {
  return member.roles.cache.has(roleId);
}
function hasRoleByName(member, roleName) {
  return member.roles.cache.some((r) => r.name === roleName);
}
function getRoleByName(member, roleName) {
  return member.roles.cache.find((r) => r.name === roleName);
}
function getRoleById(member, roleId) {
  return member.roles.cache.find((r) => r.id === roleId);
}
function addRoleById(member, roleId) {
  return member.roles.add(roleId);
}
function removeRoleById(member, roleId) {
  return member.roles.remove(roleId);
}
function getUserFromMention(mention, client) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/^<@!?(\d+)>$/);

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return;

  // However, the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];

  return client.users.cache.get(id);
}
function getMemberFromMention(mention, client) {
  const guild = client.guilds.cache.get(GuildID); // get the guild object

  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/^<@!?(\d+)>$/);

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return;

  // However, the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];

  return guild.member(id);
}
async function pinMessage(message) {
  try {
    const [head, ...tail] = message.content.split(" ");
    const _toPin = tail.join(" ");
    if (_toPin !== "") {
      const _msg = await message.channel.send(_toPin);
      if (_msg) _msg.pin();
    }
  } catch (error) {
    logger.error(error);
  }
}

async function unpinAllMessages(message) {
  try {
    const pinnedMessages = message.channel.messages.fetchPinned();
    pinnedMessages.each((msg) => msg.unpin());
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  mentionByRoleId,
  mentionByMemberId,
  setCommands,
  parseMessage,
  hasRole,
  hasRoleByName,
  getRoleByName,
  getRoleById,
  addRoleById,
  removeRoleById,
  getUserFromMention,
  getMemberFromMention,
  pinMessage,
  unpinAllMessages,
};
