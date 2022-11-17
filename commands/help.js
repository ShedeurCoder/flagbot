const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows commands'),
	async execute(interaction) {
	
        const commandList = new MessageEmbed() 
            .setColor('#0099ff')
            .setTitle(`Command list`)
            .setAuthor({ name: 'Flag Quiz', iconURL: 'https://flagemoji.com/wp-content/uploads/2020/03/Untitled-design-11.png'})
            .addFields(
                
                { name: '/help', value: `Shows this message.`, inline: true },
                { name: '/countrylist', value: `Shows the countries included in this bot.`, inline: true },
                { name: '/flag', value: `Classic flag quiz`, inline: true },
                { name: '/minute', value: `Minute flag quiz`, inline: true },
                { name: '/rank', value: `Check your rank (or someone else's) for flag high scores`, inline: true },
                { name: '/reportbug', value: `Shows a link to report a bug/problem`, inline: true },
                { name: '/invite', value: `Gives a link to invite the bot to your server`, inline: true },
                { name: 'Invite me to your server!', value: `[Invite now!](https://discord.com/api/oauth2/authorize?client_id=1042497749079314514&permissions=294205376512&scope=bot%20applications.commands)`, inline: false }
            )
            .setFooter({ text: 'Made by Shed Door#1892', iconURL: 'https://flagemoji.com/wp-content/uploads/2020/03/Untitled-design-11.png' });
        return interaction.reply({embeds: [commandList], content: 'List of commands'})
	},
};
