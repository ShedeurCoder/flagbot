const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite me to you server!'),
	async execute(interaction) {
        interaction.user.send('Invite me here: https://discord.com/api/oauth2/authorize?client_id=1042497749079314514&permissions=294205376512&scope=bot%20applications.commands')
        interaction.reply('Link to invite sent to DM')
    }
}