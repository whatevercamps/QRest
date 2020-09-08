"use strict";

const TelegramBot = require("node-telegram-bot-api");

const MessageHandler = (restaurantModel) => {
  const token = process.env.TELEGRAM_TOKEN;

  const bot = new TelegramBot(token, { polling: true });

  console.log("bot configured");

  bot.on("message", (msg) => {
    console.log("new message", msg);

    const chatId = msg.chat.id;

    if (msg.contact && msg.contact.user_id === msg.from.id) {
      const phoneNumber = msg.contact.phone_number;
      restaurantModel
        .connect()
        .then((client) =>
          restaurantModel.registerChatId(client, phoneNumber, chatId)
        )
        .then((resp) => {
          console.log("resp", resp);
          if (
            resp &&
            resp.lastErrorObject &&
            resp.lastErrorObject.updatedExisting
          ) {
            bot.sendMessage(
              chatId,
              `Registro correcto en ${
                (resp.value && resp.value.name) || " el restaurante"
              }`
            );
          } else {
            bot.sendMessage(
              chatId,
              "Algo salió mal, por favor volver a intentar o contactar a soporte "
            );
            bot.sendMessage(chatId, "Info del error: " + JSON.stringify(resp));
          }
        })
        .catch((e) => {
          bot.sendMessage(
            chatId,
            "Algo salió mal, por favor volver a intentar o contactar a soporte "
          );
          bot.sendMessage(chatId, "Info del error: " + JSON.stringify(e));
        });
    } else {
      var options = {
        parse_mode: "Markdown",
        reply_markup: JSON.stringify({
          keyboard: [[{ text: "Contact", request_contact: true }]],
          one_time_keyboard: true,
        }),
      };
      bot.sendMessage(
        chatId,
        "Por favor enviar su contacto para proceder con el registro",
        options
      );
    }
  });

  return bot;
};

module.exports = MessageHandler;
