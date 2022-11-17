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
                { name: '/rank', value: `Check your rank for flag high scores`, inline: true },
                { name: '/reportbug', value: `Shows a link to report a bug/problem`, inline: true },
            )
        return interaction.reply({embeds: [commandList], content: 'List of commands'})
	},
};