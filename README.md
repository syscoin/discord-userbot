<img src="https://i.imgur.com/Qjlpot6.png" width="100"/>
# Userbot 
> A discord chat bot for preventing username impersonation, duplication and fraud.

## Install and Run

1. `git clone `
2. `npm install`
3. `cp whitelist.template.json whitelist.json`
4. Configure client and whitelist
5. `npm run start`

## Configuration
In config.json:

| Property | Description | Default Value |
| - | - | - |
| `token` | Discord bot token | n/a |
| `prefix` | Discord bot command prefix | userbot |
| `default_channel_name` | Channel bot sends messages to when users are kicked | general |
| `check_time_ms` | Interval for imposter checks | 180000
| `kickuser_dm_msg` | Message sent to affected user(s) when they are kicked for impersonation | You've been kicked because you're username conflicts with the username a moderator on this channel. To avoid confusion \n and scams we do not allow usernames that conflict with moderator usernames. Please change your username in order to rejoin. |
| `kickuser_channel_msg` | Message sent to default channel when user is kicked. Uses tokens ${kickUsername}, ${kickServerId}, ${realUsername}, ${realServerId}. | ${kickUsername} (${kickServerId}) has been kicked by USERBOT for impersonation of an admin/mod.\n The real ${realUsername} is serverID ${realServerId}. |

## Whitelist config
In whitelist.json, the format is:
`
{  
  "serverId": [  
    "alias1",  
    "alias2"  
  ]  
}
`

For example:
`
{  
  "413024393523101706": [  
    "danosphere",  
    "danospear"  
  ]  
}
`

The whitelist can contain any number of server ids, and any number of aliases per-id. Alias checking is done using substring matching and diacritic-removal by default.
