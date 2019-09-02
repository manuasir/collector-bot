const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const { version } = require('../package.json');

// Load the logger
const BotLogger = require('../lib/logger');

class VersionController extends TelegramBaseController {
  /**
   * Handler for command "/version".
   * It returns the bot version.
   * @param {Object} $ The event.
   */
  async versionHandler($) {
    try {
      // The message object
      const { message } = $;

      // The text the user has sent
      const { text } = message;

      // Check if the incoming message is a string
      const isText = typeof text === 'string';

      BotLogger.log(message, 'COMMAND', 'INFO', 'ACCEPTED', '/version');

      const response = await $.sendMessage(`Running v${version}`);
      return response;
    } catch (error) {
      BotLogger.error(error.message || error);
    }
  }

  /**
   * Command route
   */
  get routes() {
    return {
      versionCommand: 'versionHandler'
    };
  }
}

module.exports = VersionController;
