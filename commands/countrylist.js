const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('countrylist')
		.setDescription('Shows lists of countries used'),
	async execute(interaction) {
        interaction.user.send({content: 'Here is the list of countries. This list shows the only spelling or name accepted in quizzes. Spaces and capitalization do not matter', files: ['./countries.txt']})
        return interaction.reply('List sent to DM')
    }
}