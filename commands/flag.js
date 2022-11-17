const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('./../users')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flag')
		.setDescription('How many flags can you guess in a row'),
    async execute(interaction) {
        let flags = ["Afghanistan", "Albania","Algeria","Andorra","Angola","Antigua and Barbuda", "Argentina","Armenia","Australia","Austria","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde", "Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba","Cyprus","Czechia","North Korea","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","The Gambia", "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia",'Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan',"Jordan",'Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritania','Mauritius','Mexico','Micronesia','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama',"Papua New Guinea",'Paraguay','Peru','Philippines','Poland','Portugal','Qatar','South Korea','Moldova','Romania','Russia','Rwanda',"Saint Kitts and Nevis",'Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','Tanzania','United States of America','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vatican City','Vietnam','Yemen','Zambia','Zimbabwe']
        let counter = 0
        let flagIndex = Math.round(Math.random() * flags.length)
        let flag = flags[flagIndex].toLowerCase().replaceAll(' ', '')
        
        const filter = m => m.author.id == interaction.user.id

        const collector = interaction.channel.createMessageCollector(
            {filter: filter}
        )

        interaction.reply({ content: 'What flag is this?', files: [`https://shedeurcoder.github.io/randomflag/flags/${flag}.png`]})

        collector.on('collect', async m => {
            if (m.content.toLowerCase().replaceAll(' ','') == flag) {
                flagIndex = Math.round(Math.random() * flags.length)
                flag = flags[flagIndex].toLowerCase().replaceAll(' ', '')
                m.reply({ content: 'What flag is this?', files: [`https://shedeurcoder.github.io/randomflag/flags/${flag}.png`]})
                counter ++
            } else {
                collector.stop()
                m.reply(`You got it wrong. It was ${flags[flagIndex]}. You got to ${counter} flags`)
                const user = await User.findOne({userId: interaction.user.id})
                if (!user) {
                    // create user if user does not exist
                    const newUser = new User({
                        userId: m.author.id,
                        highScore: counter,
                        totalFlags: counter,
                        minuteHighScore: 0
                    })
                    await newUser.save()
                    return
                }
                if (user) {
                    let newTotal = parseInt(user.totalFlags) + counter
                    if (counter > user.highScore) {
                        await User.findOneAndUpdate({userId: m.author.id}, {
                            highScore: counter,
                            totalFlags: newTotal
                        }, {
                            new: true
                        });
                    } else {
                        await User.findOneAndUpdate({userId: m.author.id}, {
                            totalFlags: newTotal
                        }, {
                            new: true
                        });
                    }

                }
            }
        })
    }
}
