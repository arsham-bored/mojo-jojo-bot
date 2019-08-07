const DB = require('../db/db.component'), db = new DB()
const Chat = require('../chat/chat.component'), chat = new Chat()
const Message = require('./mssg.component')

class Controller extends Message {
    chatStuff(id) {
        db.join(id)

        if (db.isEmpty(id)) {
            this.isEmpty(id)
        }
        else {
            chat.makeChat(id)
            this.startChat(id)
        }

    }

    onMessage(id, text) {
        let cond = {
            join: db.hasJoined(id),
            chat: db.hasChat(id)
        }

        if (cond.join) this.inJoinList(id)
        else if (cond.chat) {
            const friend = db.myFriend(id)
            this.send(friend, text)
        } else {
            this.noChat(id)
        }
    }

    rmChat(chatID) {
        db.rmMe(chatID);
        this.getOut(chatID);
    }
}

module.exports = new Controller()