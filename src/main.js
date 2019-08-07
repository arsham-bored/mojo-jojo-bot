const bot = require('../generator')
const controller = require('./component/response/controller.component')

bot.onText(/\/start/, ({chat: {id}}) => controller.welcome(id))
bot.onText(/\/chat/, ({chat: {id}}) => controller.chatStuff(id))
bot.onText(/\/leave/, ({chat: {id}}) => controller.rmChat(id))

bot.on('message', (usr) => {
    const {id} = usr.chat
    const {text} = usr
    const commands = ['/leave', '/chat', '/start']
    
    let cond = commands.includes(text)
    if( !cond ) {
        console.log(text)
        controller.onMessage(id, text)
    }
})