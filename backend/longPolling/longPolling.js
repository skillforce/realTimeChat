const express = require('express');
const cors = require('cors');
const events = require('events');


const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json())

const emitter = new events.EventEmitter();


app.get('/messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })

});


app.post('/messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)

}));

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`)
});