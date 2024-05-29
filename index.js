const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const port = 3000;

// Replace with your actual Telegram bot token and group chat ID
const token = '7353561893:AAFczNGCKyDkgJIRGjkH9GKXWInv5eNw-WA';
const chatId = '-4265583730';

// Initialize the bot
const bot = new TelegramBot(token, { polling: true });

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-message', (req, res) => {
    const { crypto, entryPrice, takeProfit, stopLoss } = req.body;
    const message = `#${crypto}
    Entry Price: ${entryPrice}
    Take Profit: ${takeProfit}
    Stop Loss: ${stopLoss}
    `;
    bot.sendMessage(chatId, message)
        .then(() => {
            res.status(200).send('Message sent successfully');
        })
        .catch((error) => {
            res.status(500).send('Failed to send message');
            console.error(error);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
