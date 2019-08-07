const path = require('path')
const
    lowdb = require('lowdb'),
    File = require('lowdb/adapters/FileSync'),
    adaptor = new File(path.join(__dirname, '/../../db.json')),
    db = lowdb(adaptor)


db.defaults({
    join: [],
    chat: []
})

class DB {

    listJoin() {
        return db.get('join').value()
    }

    hasChat(chatID) {
        const { froms, tos } = this.myFriend(chatID, { all: true })
        const cond = (froms !== undefined) || (tos !== undefined)
        return cond
    }

    hasJoined(id) {
        let cond = this.listJoin().includes(id)
        return cond
    }

    join(chatID) {
        const data = db.get('join')
        const check = data.value().includes(chatID)

        if (check) return
        if (this.hasChat(chatID)) return
        else return data.push(chatID).write()
    }


    chat({ from, to }) {
        return db.get("chat").push({
            from, to
        }).write()
    }

    myFriend(chatID, { all } = { all: false }) {
        const data = db.get('chat')
        const froms = data.find({ from: chatID }).value()
        const tos = data.find({ to: chatID }).value()

        switch (all) {
            case true:
                return {
                    froms,
                    tos
                }

            case false:
                if (froms == undefined && tos != undefined) return tos.from
                else if (tos == undefined && froms != undefined) return froms.to
                else return
        }

    }

    rmJoin(chatID) {
        return db.get('join').pull(chatID).write()
    }

    rmChat(volunteer) {
        const list = db.get('chat')

        list.remove({ from: volunteer }).write()
        list.remove({ to: volunteer }).write()
    }


    isEmpty(id = undefined) {
        const cond1 = this.listJoin().length <= 1
        if (id == undefined) return cond1
        else {
            const cond2 = this.hasChat(id)
            return (cond1) && !(cond2)
        }
    }

    rmMe(id) {
        const data = this.myFriend(id, { all: true })
        const result = (data.froms == undefined) ? data.tos : data.froms
        if (result !== undefined) db.get('chat').remove(result).write()

        if (this.hasJoined(id)) this.rmJoin(id)
    }
}

module.exports = DB