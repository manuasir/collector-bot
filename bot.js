// Telegram API wrapper, main bot library
const Telegram = require('telegram-node-bot');

// Adds extra features
const { TextCommand } = Telegram;

// Load the configuration file
const config = require('./config');

// Path where the bot lives
const installDir = '/home/pi';

// Used for setting up the server port. If the bot
// is under this directory, it will use port 7778 instead of 7777 (default).
const devDir = `${installDir}/telegram-node-dev`;

// Create the bot instance
const tg = new Telegram.Telegram(config.TOKEN, {
  webAdmin: {
    // Server port
    port: __dirname === devDir ? 7778 : 7777,
    // Server host. Keep it as localhost, and give the machine an Internet connection
    host: 'localhost'
  },
  // Number of CPUs to be used by the bot.
  // 1-N will use 1 to N CPUs
  // 0 will use all available CPUs
  workers: 1
});

// Load the main controller
const TextController = require('./controllers/TextController');

// Load the /version controller
const VersionController = require('./controllers/VersionController');

// Load the /news controller
const NewsController = require('./controllers/NewsController');

tg.router
  // Shows the bot version
  .when(new TextCommand('/version', 'versionCommand'), new VersionController())
  // Shows the news
  .when(new TextCommand('/news', 'newsCommand'), new NewsController())
  // Redirect all incoming events to TextController
  .otherwise(new TextController());
