import { io } from 'socket.io-client';

const URL = '127.0.0.1:3001';

export const socket = io(URL, {
    autoConnect: true,
});
