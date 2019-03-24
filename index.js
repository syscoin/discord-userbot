const Discord = require("discord.js");
const client = new Discord.Client();
const render = require('es6-template-render');

const config = require("./config.json");
const whitelist = require("./whitelist.json");
const utils = require("./utils");

let currentGuild,
  userCheckInterval;

client.on("ready", () => { //startup
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers [guilds].`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);

  currentGuild = client.guilds.get(client.guilds.keys().next().value);
  console.log("ServerID [guildId]:", currentGuild.id);
  userCheckInterval = setInterval(checkForImposters, config.check_time_ms, client);
});

client.on("guildCreate", guild => { //join server
  console.log(`New server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => { //leave server
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch(command) {
    default:
      message.channel.send("I'm here, protecting the people.");
    break;
  }
});

client.on('error', console.error);

client.login(config.token);

/*
*  User impersonation functions
* */
const kickUser = async (member, guild, realUsername, realServerId) => {
  let channel = guild.channels.find(channel => channel.name === config.default_channel_name);

  if(!member)
    return console.log(`Please mention a valid user of this server.`);

  const kickReason = config.kickuser_dm_msg;

  await member.kick(kickReason)
    .catch(error => {
      console.log(`ERROR: I cannot kick user: ${member.user.username} | ${member.user.id} | real: ${realServerId} ! Do they have a higher role? Do I have kick permissions?`);
      //channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`);
    });

  member.send(kickReason);
  channel.send(render(config.kickuser_channel_msg, { kickUsername: member.user.tag, kickServerId: member.id, realUsername, realServerId}));
};

const checkForImposters = (client) => {
  console.log("checking for imposters!");

  client.users.forEach(async (user) => {
    //console.log(user.username + ' ' + user.id);
    let isImposter = false;
    let matchingUser;

    for(let serverId in whitelist) {
      let aliasList = whitelist[serverId];
      for (let i = 0; i < aliasList.length; i++) {
        if (user.username.length >= aliasList[i].length &&
            utils.removeDiacritics(aliasList[i].toLowerCase()).indexOf(utils.removeDiacritics(user.username.toLowerCase())) > -1 &&
            serverId !== user.id) {
          console.log("IMPOSTER FOUND! ", user.username, user.id, "real is ", serverId);
          isImposter = true;
          matchingUser = { username: aliasList[0], id: serverId };
          break;
        }
      }
    }

    if(isImposter) {
      console.log("Kicking imposter: ", user.username, ' impersonating ', matchingUser.username);

      let member = currentGuild.members.get(user.id);
      await kickUser(member, currentGuild, matchingUser.username, matchingUser.id);
    }
  });
};