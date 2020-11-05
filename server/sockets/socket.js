const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');


    client.on('siguienteTicket', (args, callback) => {
        let sig = ticketControl.siguiente()
        callback(sig)
    })
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio)
            return callback({
                err: false,
                msg: 'no se encontro el escritorio'
            })
        let aTicket = ticketControl.atenderTicket(data.escritorio)
        
        callback(aTicket)

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })
    })
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    })
});