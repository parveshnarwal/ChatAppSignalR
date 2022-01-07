"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl('/chathub').build();
let username = "";

//disable send button if connection is not established

document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', function (user, msg) {
    var ul = document.getElementById('messageList');
    var li = document.createElement('li');
    var message_received = user + ': ' + msg;
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

    connection.invoke('SendMessage', username, message).then(function () {
        document.getElementById('message').value = '';
    }).catch(function (err) {
        return console.error(err.toString());
    });

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

    return;
}