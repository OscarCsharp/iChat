"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (username, message, date) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (username == $("#Username").val()) {
        var messageElement = `<div d-flex justify-content-between" <div class="text-left w-50 p-3">
                <div class="alert alert-info " role="alert" >
                    `+ msg + `<div class="text-right" >` + username + "  "+ date +`</div>
                      </div>
                 </div> </div>`;
        $("#messageList").append(messageElement);
    } else {
        messageElement = `<div class="d-flex justify-content-end">  <div class="text-left w-50 p-3">
                <div class="alert alert-dark" role="alert">
                    `+ msg + `<div class="text-right" >` + username + `
                      </div>
                     </div>
                 </div>`;
        $("#messageList").append(messageElement);
    }
    $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("Username").value;
    var message = document.getElementById("messageInput").value;

    var time = "To be modiefied";



    connection.invoke("SendMessage", user, message, time).catch(function (err) {
        return console.error(err.toString());
    });
    $("#messageInput").val('');
    event.preventDefault();
});

document.getElementById("loginButton").addEventListener("click", function (event) {

    var username = $("#Username").val();
    var name = $("#Name").val();

    if (username != "" && name != "") {

        $("#login").hide();
        $("#chat").show();
        $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
    } else {
        alert("Enter Name and Username!");
    }
    event.preventDefault();
});


