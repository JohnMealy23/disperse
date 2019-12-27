// with ES6 import
import io from 'socket.io-client';
import { DOMAIN } from './config';
import { UserMessage } from '../server/user';
import { getUserId } from './getUserId';

const socket = io(DOMAIN);
// eslint-disable-next-line no-console
console.log({ socket })

const userId = getUserId()

const input = document.getElementById('m') as HTMLInputElement
const button = document.getElementById('message-send') as HTMLInputElement
const sendMessage = (e: Event) => {
    e.preventDefault()
    const message = input.value
    const data: UserMessage = {
        message,
        id: userId,
    }
    // eslint-disable-next-line no-console
    console.log({ data })
    socket.emit('message', JSON.stringify(data));
}
socket.emit('initialize', JSON.stringify({ id: userId }))
socket.on('init', (payload: string) => {
    // eslint-disable-next-line no-console
    console.log(payload)
})
button.addEventListener('click', sendMessage)
