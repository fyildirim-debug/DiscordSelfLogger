const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let client;
let lastStatus = {};
let lastActivities = {};

// Env'den ayarları al
const DEBUG_MODE = parseInt(process.env.DEBUG_MODE) || 0;
const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL) || 5000;
const targetUserIds = process.env.TARGET_USER_IDS.split(',');
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const LANGUAGE = process.env.LANGUAGE || 'tr';

// Dil dosyasını yükle
const lang = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, 'languages', `${LANGUAGE}.json`),
        'utf8'
    )
);

// Oyun süresini formatlamak için yardımcı fonksiyon
function formatPlayTime(startTime) {
    if (!startTime) return lang.game.unknown;

    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return `${hours} ${lang.game.hours} ${minutes} ${lang.game.minutes}`;
    } else {
        return `${minutes} ${lang.game.minutes}`;
    }
}

async function sendToDiscord(user, type, action, details = '', color = '#0099ff', currentItem = '') {
    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        if (guild) {
            const channel = await guild.channels.fetch(CHANNEL_ID);
            if (channel) {
                const embed = {
                    type: 'rich',
                    color: parseInt(color.replace('#', ''), 16),
                    author: {
                        name: user.tag,
                        icon_url: user.displayAvatarURL({ dynamic: true })
                    },
                    description: details,
                    thumbnail: {
                        url: user.displayAvatarURL({ dynamic: true })
                    },
                    timestamp: new Date().toISOString()
                };

                // Başlık formatı
                let formattedTitle = `${user.tag} - [${type}] - [ ${action} ]`;
                if (currentItem) {
                    formattedTitle += ` - ${currentItem}`;
                }

                await channel.send({
                    content: formattedTitle,
                    embeds: [embed]
                });
            }
        }
    } catch (error) {
        console.error('Discord mesaj gönderme hatası:', error);
    }
}

async function checkPresence() {
    if (client) {
        await client.destroy();
    }

    client = new Client({
        checkUpdate: false,
        ws: {
            properties: {
                browser: "Discord iOS"
            }
        }
    });

    client.on('ready', async () => {
        for (const userId of targetUserIds) {
            try {
                const user = await client.users.fetch(userId);

                for (const guild of client.guilds.cache.values()) {
                    const member = await guild.members.fetch(userId).catch(() => null);
                    const newStatus = member?.presence?.status || 'offline';
                    const newActivities = member?.presence?.activities || [];

                    // Durum değişikliği
                    if (lastStatus[userId] !== newStatus) {
                        const statusColors = {
                            online: '#43b581',
                            idle: '#faa61a',
                            dnd: '#f04747',
                            offline: '#747f8d'
                        };

                        await sendToDiscord(
                            user,
                            '⚡',
                            lang.status.action,
                            `**${lang.status.status}:** ${lang.status[newStatus] || lang.status.unknown}`,
                            statusColors[newStatus],
                            lang.status[newStatus] || lang.status.unknown
                        );
                        lastStatus[userId] = newStatus;
                    }

                    // Spotify değişikliği
                    const oldSpotify = lastActivities[userId]?.find(a => a.name === 'Spotify');
                    const newSpotify = newActivities.find(a => a.name === 'Spotify');

                    if (newSpotify && (!oldSpotify || oldSpotify.details !== newSpotify.details)) {
                        const spotifyDetails = newSpotify.details || lang.music.unknown_song;
                        const spotifyState = newSpotify.state || lang.music.unknown_artist;
                        const spotifyAlbum = newSpotify.assets?.largeText || lang.music.unknown_album;

                        if (!oldSpotify) {
                            await sendToDiscord(
                                user,
                                '🎵',
                                lang.music.started,
                                `**${lang.music.song}:** ${spotifyDetails}\n**${lang.music.artist}:** ${spotifyState}\n**${lang.music.album}:** ${spotifyAlbum}`,
                                '#1DB954',
                                spotifyDetails
                            );
                        } else {
                            await sendToDiscord(
                                user,
                                '🎵',
                                lang.music.changed,
                                `**${lang.music.previous_song}:** ${oldSpotify.details}\n**${lang.music.new_song}:** ${spotifyDetails}\n**${lang.music.artist}:** ${spotifyState}\n**${lang.music.album}:** ${spotifyAlbum}`,
                                '#1DB954',
                                spotifyDetails
                            );
                        }
                    } else if (oldSpotify && !newSpotify) {
                        await sendToDiscord(
                            user,
                            '🎵',
                            lang.music.stopped,
                            `**${lang.music.last_song}:** ${oldSpotify.details}\n**${lang.music.artist}:** ${oldSpotify.state}`,
                            '#1DB954'
                        );
                    }

                    // Oyun değişikliği
                    const oldGame = lastActivities[userId]?.find(a => a.type === 'PLAYING');
                    const newGame = newActivities.find(a => a.type === 'PLAYING');
                    if (oldGame?.name !== newGame?.name) {
                        if (!oldGame && newGame) {
                            const gameDetails = newGame.details ? `\n**${lang.game.detail}:** ${newGame.details}` : '';
                            const gameState = newGame.state ? `\n**${lang.game.status}:** ${newGame.state}` : '';

                            await sendToDiscord(
                                user,
                                '🎮',
                                lang.game.started,
                                `**${lang.game.game}:** ${newGame.name}${gameDetails}${gameState}`,
                                '#7289DA',
                                newGame.name
                            );
                        } else if (oldGame && !newGame) {
                            await sendToDiscord(
                                user,
                                '🎮',
                                lang.game.stopped,
                                `**${lang.game.game}:** ${oldGame.name}\n**${lang.game.play_time}:** ${formatPlayTime(oldGame.timestamps?.start)}`,
                                '#7289DA'
                            );
                        } else if (newGame) {
                            const gameDetails = newGame.details ? `\n**${lang.game.detail}:** ${newGame.details}` : '';
                            const gameState = newGame.state ? `\n**${lang.game.status}:** ${newGame.state}` : '';

                            await sendToDiscord(
                                user,
                                '🎮',
                                lang.game.changed,
                                `**${lang.game.previous_game}:** ${oldGame.name}\n**${lang.game.new_game}:** ${newGame.name}${gameDetails}${gameState}`,
                                '#7289DA',
                                newGame.name
                            );
                        }
                    }

                    lastActivities[userId] = newActivities;
                    break;
                }
            } catch (error) {
                console.error(`Kullanıcı bilgisi alınamadı: ${error}`);
            }
        }

        await client.destroy();
    });

    try {
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('Giriş hatası:', error);
    }
}

// İlk kontrol
checkPresence();

// Belirtilen aralıkta kontrol et
setInterval(checkPresence, CHECK_INTERVAL);

process.on('unhandledRejection', error => {
    console.error('İşlenmeyen hata:', error);
});