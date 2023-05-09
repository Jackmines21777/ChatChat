$(function (){
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


    nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('nuevo usuario', nickname.val(), data =>{
            if(data){
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html(`
                <div class="alert alert-danger"> 
                 Usuario ya existe.
                </div>
                `);
            }
        });
    });


    // eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val(), data =>{
            $chat.append(`<p class="error"> ${data}</p> `)
        });
        messageBox.val('');
    });
     username = [];

    

    socket.on('usernames', users =>{
        let html ='';
        this.username = users;
        // console.log(this.username);
        for (let i=0; i<users.length; i++){
            html += `<p> 👀 ${users[i]}</p>`
        }
        usernames.html(html);

        socket.on('nuevo mensaje', function(data) {
            let color = "#f4f4f4";
            
    
            console.log(users);
            // for (let i = 0; i < this.username?.length; i++) {
                
            // }
            users.forEach(u => {
                if(u==data.nick) {
                    color = "#9ff4c5";
                }
            })
            
            if(classCSS == 'izq'){
                chat.append(`<div style="background-color:${color}"><b>${data.nick}: </b>${data.msg}</div>`);
            } else {
                chat.append(`<div style="background-color:${color}">${data.msg}<b> :${data.nick} </b></div>`);
            }
            
                
            });

    });

    socket.on('privado', data =>{
        chat.append(`<p class="privado"><b>${data.nick}: </b>${data.msg}</p>`);
    });

})
