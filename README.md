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

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
