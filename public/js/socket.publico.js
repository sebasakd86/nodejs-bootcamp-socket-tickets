var socket = io()

var lblTickets = []
var lblEscritorio = []
for (let i = 1; i <= 4; i++) {
    lblTickets.push($('#lblTicket' + i))
    lblEscritorio.push($('#lblEscritorio' + i))
}

socket.on('estadoActual', function (data) {
    actualizaHTML(data.ultimosCuatro)
})
socket.on('ultimosCuatro', function(data){
    var audio = new Audio('audio/new-ticket.mp3')
    audio.muted = true;
    let promise = audio.play();
    console.log(promise)
    if(promise !== undefined){

    }
    audio.muted = false;
    actualizaHTML(data.ultimosCuatro)
})

function actualizaHTML(ultimosCuatro) {
    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimosCuatro[i].numero)
        lblEscritorio[i].text('Escritorio ' + ultimosCuatro[i].escritorio)
    }
}