const bot = require('../../../generator')

class Message {
    welcome(id) {
        bot.sendMessage(id, "welcome,\nuse /chat to get start with")
    }

    isEmpty(id) {
        bot.sendMessage(id, "lemme have a search for you...")
    }

    startChat(id) {
        bot.sendMessage(id, "ok, here you are. say something to your friend.\nyou can simply leave the chat by using /leave")
    }

    noChat(id) {
        bot.sendMessage(id, "whether nothings here or chat gone. don't talk with me. I'm bot")
    }

    send(id, txt) {
        bot.sendMessage(id, txt)
    }

    getOut(id) {
        bot.sendMessage(id, 'ok then. connection deleted\n use /chat to make new one.')
    }

    inJoinList(id) {
        bot.sendMessage(id, "you are still in join-list. wait for a member")
    } 
}

module.exports = Message