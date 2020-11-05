const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []
        this.ultimosCuatro = []

        let data = require('../data/data.json')
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo()
        }
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0)
            return 'No hay tickets'

        let nTicket = this.tickets[0].numero

        this.tickets.shift()

        let aTicket = new Ticket(nTicket, escritorio)

        this.ultimosCuatro.unshift(aTicket)

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1)
        }

        this.grabar()

        return aTicket;
    }
    getUltimosCuatro() {
        return this.ultimosCuatro
    }
    getUltimoTicket() {
        return this.ultimo
    }
    grabar() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData))
    }
    reiniciarConteo() {
        this.ultimo = 0
        this.tickets = []
        this.ultimosCuatro = []
        this.grabar()
        console.log('Reiniciaron los contadores')
    }
    siguiente() {
        this.ultimo += 1
        this.tickets.push(new Ticket(this.ultimo, null))
        this.grabar()
        return this.getUltimoTicket()
    }
}

module.exports = {
    TicketControl
}