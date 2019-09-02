const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const { news } = require('../news');

// Load the logger
const BotLogger = require('../lib/logger');

class NewsController extends TelegramBaseController {
  /**
   * Handler for command "/news".
   * It returns latest GTA news
   * @param {Object} $ The event.
   */
  async newsHandler($) {
    try {
      // The message object
      const { message } = $;

      // The text the user has sent
      const { text } = message;

      // Check if the incoming message is a string
      const isText = typeof text === 'string';

      BotLogger.log(message, 'COMMAND', 'INFO', 'ACCEPTED', '/news');

      const response = await $.sendMessage(news);
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
      newsCommand: 'newsHandler'
    };
  }
}

module.exports = NewsController;
