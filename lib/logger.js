/**
 * Helper class for internal logging
 */
class BotLogger {
  /**
   * Sends to the stdout an internal bot message.
   * @param {*} message The message object
   * @param {*} messageType The message type. E.g: STICKER, TEXT, DOCUMENT...
   * @param {*} logLevel The log level. E.g: INFO, WARNING, ERROR
   * @param {*} action The bot action. E.g: ACCEPTED, IGNORED, BLOCKED...
   */
  static log(
    message,
    messageType,
    logLevel = 'INFO',
    action = 'ACCEPTED',
    forceLoggerMessage = false
  ) {
    try {
      const currentDate = new Date().toISOString();

      // The text and the chat from the message
      const { text, _chat } = message;

      // Extracts username and user ID from the message properties
      const { username, _id } = message.from;

      // Chat type
      const chatType = (_chat || {})._type;

      // Message comes from a group or from a private conversation with the bot
      const isGroup = chatType === 'group' || chatType === 'supergroup';

      // If the message comes from a group, gets the group name
      const groupName = isGroup ? _chat._title : null;

      // Check if the incoming message is a string
      const isText = typeof text === 'string';

      // Define the message to be logged in the service logs
      const loggerMessage = isText ? text : 'NO_MESSAGE';

      // Build the log message
      const logMessage = `${currentDate} - ${logLevel} - ${username} - ${_id} - ${action} - ${messageType} - ${forceLoggerMessage ||
        loggerMessage} - ${groupName || 'PRIVATE'}`;

      // Sends the log to the stdout
      console.log(logMessage);
    } catch (error) {
      BotLogger.error(error.message || error);
    }
  }

  /**
   * Sends to the stdout an internal bot message.
   * @param {*} reason The error message.
   */
  static error(reason = '') {
    const currentDate = new Date().toISOString();
    // Build the log message
    const logMessage = `${currentDate} - ERROR - ERROR - ERROR - ERROR - ERROR - TEXT - ${reason}`;
    // Sends the log to the stdout
    console.log(logMessage);
  }
}

module.exports = BotLogger;
