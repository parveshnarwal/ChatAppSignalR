"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl('/chathub').build();
let username = "";

//disable send button if connection is not established

document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', function (user, msg) {
    var ul = document.getElementById('messageList');
    var li = document.createElement('li');
    li.classList.add('list-group-item');
    li.style.textDecoration = 'none';
    var message_received = user + ' says : ' + msg;
    li.appendChild(document.createTextNode(message_received));
    ul.appendChild(li);
});


connection.start().then(function () {
    document.getElementById('sendButton').disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', function (e) {

    var message = document.getElementById('message').value;

    if (message == '') {
        alert('Message can not be empty.')
        return;
    }

    var receiver_connection_id = document.getElementById('receiver-connection-id').value;

    if (receiver_connection_id == '') {
        connection.invoke('SendMessage', username, message).then(function () {
            document.getElementById('message').value = '';
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }

    else {
        connection.invoke('SendMessageToUser', receiver_connection_id, username, message).then(function () {
            document.getElementById('message').value = '';
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }
    

    e.preventDefault();
});

function SetUsername() {
    var usernameInput = document.getElementById('username').value;
    if (usernameInput == '') {
        alert('Please enter your username')
        return;
    }

    username = usernameInput;

    document.getElementById('user-info-form').style.display = 'none';
    document.getElementById('message-area').style.display = 'block';
    document.getElementById('name').innerText = usernameInput;

    connection.invoke('GetConnectionId').then(function (connid) {

        document.getElementById('connection-id').innerText = connid;

    }).catch(function () {

    });

    return;
}