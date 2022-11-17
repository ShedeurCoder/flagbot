const User = require('./../users');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Shows your flag rank in globally!')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user to see the rank of')
				.setRequired(false)),
	async execute(interaction) {
        if (interaction.options.getUser('user')) {
            const taggedUser = interaction.options.getUser('user')
            const unUser = User.findOne({userId: taggedUser.id})
            const unRankOfTotalFlags = User.aggregate([
                {$sort: {totalFlags: -1}}
            ])
            const unRankOfHighScore = User.aggregate([
                {$sort: {highScore: -1}}
            ])
            const unRankOfHighScoreMinute = User.aggregate([
                {$sort: {minuteHighScore: -1}}
            ])
            const [user, rankOfTotalFlags, rankOfHighScore, rankOfHighScoreMinute] = await Promise.all([unUser, unRankOfTotalFlags, unRankOfHighScore, unRankOfHighScoreMinute]);
            if (!user) {
                return interaction.reply({content: 'User either does not exist or has never played', ephemeral: true})
            }
            const flagsRank = rankOfTotalFlags.findIndex(x => x.userId == taggedUser.id) + 1;
            const scoreRank = rankOfHighScore.findIndex(x => x.userId == taggedUser.id) + 1;
            const minuteScoreRank = rankOfHighScoreMinute.findIndex(x => x.userId == taggedUser.id) + 1;

            const rankEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${taggedUser.username}\'s rank`)
                .setAuthor({ name: 'Flag Quiz', iconURL: 'https://flagemoji.com/wp-content/uploads/2020/03/Untitled-design-11.png'})
                .addFields(
                    
                    { name: 'High Score (Classic)', value: `${user.highScore}`, inline: true },
                    { name: 'High Score (1 minute)', value: `${user.minuteHighScore}`, inline: true },
                    { name: 'Total Flags', value: `${user.totalFlags}`, inline: true },

                    // global rank
                    { name: 'Global High Score Rank (Classic)', value: `${scoreRank}`, inline: true },
                    { name: 'Global High Score Rank (1 minute)', value: `${minuteScoreRank}`, inline: true },
                    { name: 'Global Total Flags Rank', value: `${flagsRank}`, inline: true },
                )
                .setImage(`https://cdn.discordapp.com/avatars/${taggedUser.id}/${taggedUser.avatar}.png?size=256`)
            return interaction.reply({ embeds: [rankEmbed] });
        } else {
            const unUser = User.findOne({userId: interaction.user.id})
            const unRankOfTotalFlags = User.aggregate([
                {$sort: {totalFlags: -1}}
            ])
            const unRankOfHighScore = User.aggregate([
                {$sort: {highScore: -1}}
            ])
            const unRankOfHighScoreMinute = User.aggregate([
                {$sort: {minuteHighScore: -1}}
            ])
            const [user, rankOfTotalFlags, rankOfHighScore, rankOfHighScoreMinute] = await Promise.all([unUser, unRankOfTotalFlags, unRankOfHighScore, unRankOfHighScoreMinute]);
            if (!user) {
                return interaction.reply({content: 'You did do any games, so you don\'t have a rank yet.', ephemeral: true})
            }
            const flagsRank = rankOfTotalFlags.findIndex(x => x.userId == interaction.user.id) + 1;
            const scoreRank = rankOfHighScore.findIndex(x => x.userId == interaction.user.id) + 1;
            const minuteScoreRank = rankOfHighScoreMinute.findIndex(x => x.userId == interaction.user.id) + 1;

            const rankEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${interaction.user.username}\'s rank`)
                .setAuthor({ name: 'Flag Quiz', iconURL: 'https://flagemoji.com/wp-content/uploads/2020/03/Untitled-design-11.png'})
                .addFields(
                    
                    { name: 'High Score (Classic)', value: `${user.highScore}`, inline: true },
                    { name: 'High Score (1 minute)', value: `${user.minuteHighScore}`, inline: true },
                    { name: 'Total Flags', value: `${user.totalFlags}`, inline: true },

                    // global rank
                    { name: 'Global High Score Rank (Classic)', value: `${scoreRank}`, inline: true },
                    { name: 'Global High Score Rank (1 minute)', value: `${minuteScoreRank}`, inline: true },
                    { name: 'Global Total Flags Rank', value: `${flagsRank}`, inline: true },
                )
                .setImage(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
            return interaction.reply({ embeds: [rankEmbed] });
        }
    }
};
