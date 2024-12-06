import 'dotenv/config'

export const config = {
    web: {
        port: process.env.HTTP_PORT || 3000,
    },
    topic: process.env.ROOM_TOPIC,
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
    }
};