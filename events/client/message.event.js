const { BOT_PREFIX } = require("../../_helpers/constants");

module.exports = (Discord, client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(BOT_PREFIX)) return;
  const { command, args } = parseMessage(message);
  const c = client.commands.get(command);
  if (c) c.execute(client, message, args, Discord);
};

/**
 * Takes a message sent by the user and returns an objet with the command and the args
 * @param {string} message discord message object
 * @returns {{command: string, args: string[]}} message broken into command and arguments
 *
 * @example
 * input: !ping -- output: {ping, undefined}
 * input: !hello world -- output: {hello, [world]}
 * input: !hello world 5 -- output: {hello, [world,5]}
 */
function parseMessage(message) {
  //   logger.info(message.content);
  const _message = message.content.trim();

  const args = _message.slice(BOT_PREFIX.length).split(/\s+/);
  const command = args.shift().toLocaleLowerCase();
  return { command, args };
}
