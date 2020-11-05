var socket = io()

var sParams = new URLSearchParams(window.location.search)

if (!sParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es oligatorio')
}

var escritorio = sParams.get('escritorio')
var label = $('small')

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', function () {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function (resp) {
        if(resp)
            label.text(resp.numero)                
        else
            alert('no hay mas tickets')
    })
})