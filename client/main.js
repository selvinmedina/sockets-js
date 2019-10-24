var socket = io.connect('http://192.168.0.11:6677', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return(`
            <div class="message">
                <strong>${message.nickName}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    var div_msgs = document.getElementById('messages').innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickName: document.getElementById('nickName').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickName').style.display = 'none';
    socket.emit('add-message',message);
    return false;
}