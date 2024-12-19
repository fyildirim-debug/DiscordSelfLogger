# DiscordSelfLogger

[English](#english) | [Türkçe](#türkçe)

# English

A Discord self-bot that logs user activities including:
- Status changes
- Spotify activity
- Gaming activity

## Features
- Real-time activity tracking
- Multi-language support (English/Turkish)
- Customizable check intervals
- Debug mode
- Multiple user tracking
- Detailed activity logs
- Custom formatting for different activity types

## Requirements
- Node.js v16 or higher
- npm (Node Package Manager)

## Required Packages
Install the following packages using npm:
```bash
npm install discord.js-selfbot-v13@3.4.6
npm install dotenv@16.4.7
npm install express@4.21.2
```

Or install all dependencies at once:
```bash
npm install
```

## Installation
1. Clone the repository
```bash
git clone https://github.com/fyildirim-debug/DiscordSelfLogger.git
cd DiscordSelfLogger
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Edit `.env` file with your values:
- `DISCORD_TOKEN`: Your Discord token
- `TARGET_USER_IDS`: IDs of users to track (comma-separated)
- `GUILD_ID`: Server ID
- `CHANNEL_ID`: Channel ID where messages will be sent
- `LANGUAGE`: Language selection (tr/en)

5. Start the bot
```bash
node index.js
```

## Configuration
All configuration is done through the `.env` file:
```env
DISCORD_TOKEN=your_token_here
TARGET_USER_IDS=id1,id2,id3
DEBUG_MODE=1
CHECK_INTERVAL=5000
GUILD_ID=your_guild_id
CHANNEL_ID=your_channel_id
LANGUAGE=en
```

## Project Structure
```
DiscordSelfLogger/
├── index.js
├── .env.example
├── package.json
├── README.md
└── languages/
    ├── tr.json
    └── en.json
```

## package.json
```json
{
  "name": "discordselfbot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "discord.js-selfbot-v13": "^3.4.6",
    "dotenv": "^16.4.7",
    "express": "^4.21.2"
  }
}
```

## Output Examples
```
username - [🎵] - [ Started Listening Music ] - Shape of You
username - [⚡] - [ Status Changed ] - online
username - [🎮] - [ Started Playing Game ] - Valorant
```

---

# Türkçe

Discord kullanıcı aktivitelerini takip eden bir self-bot:
- Durum değişiklikleri
- Spotify aktivitesi
- Oyun aktivitesi

## Özellikler
- Gerçek zamanlı aktivite takibi
- Çoklu dil desteği (İngilizce/Türkçe)
- Özelleştirilebilir kontrol aralıkları
- Hata ayıklama modu
- Çoklu kullanıcı takibi
- Detaylı aktivite kayıtları
- Farklı aktivite tipleri için özel formatlar

## Gereksinimler
- Node.js v16 veya üstü
- npm (Node Paket Yöneticisi)

## Gerekli Paketler
Aşağıdaki paketleri npm kullanarak yükleyin:
```bash
npm install discord.js-selfbot-v13@3.4.6
npm install dotenv@16.4.7
npm install express@4.21.2
```

Veya tüm bağımlılıkları tek seferde yükleyin:
```bash
npm install
```

## Kurulum
1. Depoyu klonlayın
```bash
git clone https://github.com/fyildirim-debug/DiscordSelfLogger.git
cd DiscordSelfLogger
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Ortam değişkenlerini yapılandırın
```bash
cp .env.example .env
```

4. `.env` dosyasını kendi değerlerinizle düzenleyin:
- `DISCORD_TOKEN`: Discord token'ınız
- `TARGET_USER_IDS`: Takip edilecek kullanıcı ID'leri (virgülle ayrılmış)
- `GUILD_ID`: Sunucu ID'si
- `CHANNEL_ID`: Mesajların gönderileceği kanal ID'si
- `LANGUAGE`: Dil seçimi (tr/en)

5. Botu başlatın
```bash
node index.js
```

## Yapılandırma
Tüm yapılandırma `.env` dosyası üzerinden yapılır:
```env
DISCORD_TOKEN=token_buraya
TARGET_USER_IDS=id1,id2,id3
DEBUG_MODE=1
CHECK_INTERVAL=5000
GUILD_ID=sunucu_id
CHANNEL_ID=kanal_id
LANGUAGE=tr
```

## Proje Yapısı
```
DiscordSelfLogger/
├── index.js
├── .env.example
├── package.json
├── README.md
└── languages/
    ├── tr.json
    └── en.json
```

## package.json
```json
{
  "name": "discordselfbot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "discord.js-selfbot-v13": "^3.4.6",
    "dotenv": "^16.4.7",
    "express": "^4.21.2"
  }
}
```

## Çıktı Örnekleri
```
kullaniciadi - [🎵] - [ Müzik Dinlemeye Başladı ] - Shape of You
kullaniciadi - [⚡] - [ Durum Değiştirdi ] - çevrimiçi
kullaniciadi - [🎮] - [ Oyun Oynamaya Başladı ] - Valorant
```

## License / Lisans
ISC

## Contributing / Katkıda Bulunma
Pull requests are welcome. / Pull request'ler kabul edilir.

## Disclaimer / Sorumluluk Reddi
This project is for educational purposes only. / Bu proje sadece eğitim amaçlıdır.

---

Made with ❤️ by [FurkanYILDIRIM.com](https://FurkanYILDIRIM.com)
[![Visitors](http://fysunucu.com/profilecounter/counter_badge.php?key=73c7df77b22257734237ee007f34060b)](http://fysunucu.com/profilecounter/counter_badge.php?key=73c7df77b22257734237ee007f34060b)
