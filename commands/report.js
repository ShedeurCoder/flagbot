const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reportbug')
		.setDescription('Report a bug or create a suggestion'),
	async execute(interaction) {
        interaction.user.send('Report a bug or create a suggestion here: https://forms.gle/GD35WAYfzx3uGJUJ6')
        interaction.reply('Link to report a bug or create suggestion sent to DM')
    }
}