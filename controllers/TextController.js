// Telegram API wrapper, main bot library
const Telegram = require('telegram-node-bot');

// Base class to be extended by a bot controller
const TelegramBaseController = Telegram.TelegramBaseController;

// Load the logger
const BotLogger = require('../lib/logger');

class TextController extends TelegramBaseController {
  constructor() {
    super();
  }

  /**
   * Handler for the message listener.
   * All new events end here.
   * @param {Object} $ The event.
   */
  async handle($) {
    try {
      // The message object
      const { message } = $;

      // Get the message type
      const type = this.getMsgType(message);

      BotLogger.log(message, type, 'INFO', 'ACCEPTED');
    } catch (error) {
      BotLogger.error(error.message || error);
    }
  }

  /**
   * Get the type of the message.
   * Possible types are: sticker, documents, photos and text.
   * @param {String} msg The message to be checked.
   */
  getMsgType(msg = {}) {
    if (msg.sticker) return 'STICKER';
    else if (msg.document) return 'DOCUMENT';
    else if (msg.photo) return 'PHOTO';
    else return 'TEXT';
  }
}

module.exports = TextController;
