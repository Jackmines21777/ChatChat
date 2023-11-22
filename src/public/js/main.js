$(function () {
    const socket = io();
    // obtener dOM
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    // var u = '';

    //obtener nickname form
    const nickForm = $('#nickForm');
    const nickname = $('#nickname');
    const nickError = $('#nickError');
    const usernames = $('#usernames');


    let miNick;

    nickForm.submit(e => {
        e.preventDefault();
        if (nickname.val() !== '') {
            socket.emit('nuevo usuario', nickname.val(), data => {
                if (data) {
                    miNick = nickname.val();//df u
                    $('#nick-wrap').hide();
                    $('#content-wrap').show();
                } else {
                    nickError.html(`
                    <div class="alert alert-danger"> 
                     Usuario ya existe.
                    </div>
                    `);
                }
            });
        } else {
            nickError.html(`
                    <div class="alert alert-danger"> 
                    No se ingreso un nombre de usuario.
                    </div>
                    `);
        }


    });


    // eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val(), data => {
            $chat.append(`<p class="error"> ${data}</p> `)
        });
        messageBox.val('');
    });



    //subscripcion solo para  listar users en html
    socket.on('usernames', users => {
        let color = ''
        let html = '';

        console.log(users)


        for (let i = 0; i < users.length; i++) {
            if (miNick == users[i]) {
                color = "#9ff4c5";
            } else {
                color = "#f8f8f8"
            }
            html += `<p style="background:${color}"> 👀 ${users[i]}</p>`
        }
        usernames.html(html);
    });




    //subscripcion solo para recibir el nuevo mensaje
    socket.on('nuevo mensaje', data => {

        /*
        data = {msg=adkasda ,nick= da,userNames = ['da','de','do']}
        */

        let classCSS = "izq";
        console.log(data);
        listaMsg.push(data.msg);

        if (miNick == data.nick) {
            classCSS = "drc";
            chat.append(`<div class="${classCSS}"><b>&nbsp:${data.nick} </b>${data.msg} </div>`);

        }else{
            chat.append(`<div class="${classCSS}"><b>${data.nick}:&nbsp</b>${data.msg} </div>`);
        }


        
    });





    socket.on('privado', data => {
        chat.append(`<p class="privado"><b>${data.nick}: </b>${data.msg}</p>`);
    });

})
let listaMsg = []











//on = subscripcion
//emi = emitir