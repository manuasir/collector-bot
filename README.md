# Collector bot

## Description

This bot will store every message sent in a group and in private mode.

## How to use

1. You need to create a bot with @botfather, then you'll got a TOKEN.
2. Clone the repository, then move into the root directory of the project.
3. Install the latest Node.js version.
4. Install all the dependencies. Do not use `sudo` or `root`.

```sh
npm install
```

5. Configure your token copying the sample configuration and replacing its value with your own value.

```sh
cp config.sample.js config.js
```

6. Integrate it with the Elastic stack, see [ELK-How-to](ELK-How-to.md) for details.

## Creating a system service

1. Install PM2.

```sh
sudo npm install -g pm2
```

2. Start the server. Do not use `sudo` or `root`.

```sh
cd bot-dir/
pm2 start bot.js
```

3. Create system service. Do not use `sudo` or `root`, use it for the next command.

```sh
pm2 startup
```

Example:

```sh
$ pm2 startup
[PM2] You have to run this command as root. Execute the following command:
      sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

4. Copy the command `pm2 startup` gave you, and execute it.
5. Save your services. Do not use `sudo` or `root`.

```sh
pm2 save
```

## How to contribute?

1. Follow the "How to use" steps.
2. Test your changes.
3. Create a pull request.
4. Wait for a review.
5. That's all!
