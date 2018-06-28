var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');

var artists = [];
var billboardSongs = [];
var displayArtists = "Your artist(s) are: ";

function formatBody(songs) {
    var formattedString = "";
    for (i = 0; i < songs.length; i++) {
        song = songs[i].split(/\r\n|\r|\n/);
        title = '<p><b>' + song[1] + '</b>'
        artist = ': <i>' + song[3] + '</i></p>'
        formattedString += title + artist;
        // console.log(formattedString);
    }
    return formattedString;
}

for (let i = 2; i < process.argv.length; i++) {
    artists.push(process.argv[i])
}

if (artists.length != 0) {
    displayArtists += artists[0].toString();
    for (let i = 1; i < artists.length; i++) {
        if (i == artists.length - 1) {
            displayArtists += (", and " + artists[i]);
        } else
            displayArtists += (", " + artists[i]);
    }
}
console.log(displayArtists);

request('https://www.billboard.com/charts/rap-song', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('div.chart-row__title').each(function (i, element) {
            var song = $(this).text();
            artists.forEach(function (artist) {
                if (song.includes(artist) && !billboardSongs.includes(song)) {
                    billboardSongs.push(song);
                }
            });
        });
    }
    // console.log(billboardSongs.toString());
    var displaySongs = formatBody(billboardSongs);

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'qzwzdo4tn73ug5sd@ethereal.email',
            pass: '5mX7ZHQ15BVt3nDrRU'
        }
    });

    let mailOptions = {
        from: '"Sender" <qzwzdo4tn73ug5sd@ethereal.email>',
        to: 'qzwzdo4tn73ug5sd@ethereal.email',
        subject: displayArtists,
        html: displaySongs
    };

    if (billboardSongs.length != 0) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
});