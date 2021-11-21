const ws = require('ws')


const wss = new ws.Server({
    port:5000,
},()=>{
    console.log(`Server was successfully started on port 5000`)
});



wss.on('connection', (ws)=>{
    // ws.id = Date.now(); передаем вторым параметром в широковещатель(для создания приватных комнат)
    ws.on('message',(mess)=>{
        mess=JSON.parse(mess);
        switch (mess.event){
            case 'message':
                broadcastMessage(mess)
                break;
            case 'connection':
                broadcastMessage(mess)
                break;
        }

    })

    // ws.send('User ... currently online')
});

const broadcastMessage=(message,id)=>{
    // if(client.id === id){
    //     client.send(JSON.stringify(message))
    // }//чтобы отправлять сразу всем подключенным к чату юзерам
    wss.clients.forEach(client=>{
        client.send(JSON.stringify(message))
    })
}





// const message ={  // примерный вид сообщения
//     event:'message/connection',
//     id:123,
//     date:'21.01.2021',
//     username:'sarcasm1613',
//     message:'your message here'
// }