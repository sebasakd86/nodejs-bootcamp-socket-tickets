
var socket = io()
var label = $("#lblNuevoTicket")

socket.on('connect', function() {
    console.log('conectado')
})
socket.on('disconnect', function() {
    console.log('disconectado')
})
socket.on('estadoActual', function(obj){
    label.text(obj.actual)
})

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(ticket){
        label.text(ticket)
    })
})