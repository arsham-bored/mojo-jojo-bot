const DB = require('../db/db.component')
const _ = require('lodash')

class Chat extends DB {
    constructor() {
        super()
    }

    searchRandom({chatID}) {
        const random = (list) => {
            const result = Math.floor(
                Math.random() * list.length
            )
    
            return list[result]
        }

        const arr = this.listJoin()
        if(arr==undefined) return
        if(arr.length < 1) return

        const arrWithOutMe = _.pull(arr, chatID)

        const choosen = random(arrWithOutMe)
        return choosen
    }

    makeChat(chatID) {
        const pick = this.searchRandom({chatID})
        if(pick==undefined) return
        this.rmJoin(chatID)
        this.rmJoin(pick)

        this.chat({
            from: chatID,
            to: pick
        })

    }

    
}


module.exports = Chat