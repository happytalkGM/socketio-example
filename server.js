import { config } from "./config.js";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

// redis client
const pubClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
});
pubClient.on("error", console.error);
const subClient = pubClient.duplicate();

// set web server
const app = express();
const server = createServer(app);

// set socket.io server
const io = new Server(server, {
    connectionStateRecovery: {},
    transports: ['websocket'], // fix protocol
    adapter: createAdapter(pubClient, subClient),
});

// serving to static resource
app.use(express.static('public'));
app.use('/socket.io', express.static('./node_modules/socket.io/client-dist'));

// websocket event
io.on('connection', async (socket) => {
    console.log(`a user connected: ${socket.id}`);

    await socket.join(config.topic);

    socket.on('disconnect', () => {
        console.log(`a user disconnected: ${socket.id}`);
    });

    socket.on('chat-message', (message) => {
        console.log(`message: ${socket.id} > ${message}`);

        const payload = {
            author: socket.id,
            message: message,
        };
        io.to(config.topic).emit('chat-message', payload);
    });
});

(async () => {
    // connect redis
    await Promise.all([
        pubClient.connect(),
        subClient.connect(),
    ]);

    // listen
    server.listen(config.web.port, () => {
        console.log(`server running at http://localhost:${config.web.port}`);
    });
})().catch(console.error);

