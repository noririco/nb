const path = require("path");
const fs = require("fs");
const logger = require("../logger");

const eventsDir = path.join(__dirname, "..", "events");
logger.info(`[event.handle.js] ${eventsDir}`);

module.exports = (client, Discord) => {
  const loadDir = (_dir) => {
    logger.info(`[event.handle.js] ${_dir}`);
    const eventFiles = fs
      .readdirSync(`${eventsDir}/${_dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsDir, _dir, file);
      logger.info(`[event.handle.js] ${filePath}`);
      const event = require(filePath);
      const eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, Discord, client));
    }
  };

  ["client", "guild"].forEach((d) => loadDir(d));
};
