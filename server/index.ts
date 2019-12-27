import * as express from 'express'
import * as http from 'http'
import * as Socket from 'socket.io'
import { UserMessage, createUser } from './user'

const app = express();
const server = http.createServer(app);
const io = Socket(server)

app.use(express.static('public'));

type Client = {
    on: (eventName: string, cb: (payload: string) => void) => void;
    emit: (eventName: string, payload: string) => void;
}

const registry = {}
let clientCache: Client

io.on('connection', (client: Client) => {
    clientCache = client
    client.on('initialize', (payload: string) => {
        // eslint-disable-next-line no-console
        console.log({ client })
        const data = JSON.parse(payload) as UserMessage;
        registry[data.id] = registry[data.id] || createUser(data)
        const userData = registry[data.id]

        client.emit('init', JSON.stringify(userData))
    })
    client.on('message', (payload: string) => {
        const data = JSON.parse(payload) as UserMessage;
        registry[data.id].messages.push(data.message)

        // eslint-disable-next-line no-console
        console.log('messages:', registry[data.id]);
    });

    client.on('disconnect', (x) => {
        // eslint-disable-next-line no-console
        console.log('Disconnected!', { x })
    });

});

app.post('/bus', (req, res) => {
    if (clientCache) {
        clientCache.emit(req.body.eventType, req.body.data)
        res.send(`${req.body.eventType} emitted`);
    } else {
        res.status(404).send(`No client to receive ${req.body.eventType} event`);
    }
});

app.get('/', (req, res) => {
    // res.sendFile(`${__dirname}/public/index.html`);
    res.sendFile(`${process.cwd()}/public/index.html`);
});

server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('listening on *:3000');
});
