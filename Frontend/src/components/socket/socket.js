import socketIO from 'socket.io-client';

const END_POINT = process.env.REACT_APP_END_POINT;
const socket = socketIO(END_POINT, { transports: ['websocket'] });

export default socket;
