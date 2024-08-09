import { createClient, RedisClientType } from "redis";

export const initRedisClient = () => {
    return new Promise<RedisClientType>( async (resolve, reject) => {
        
        let redisClient: RedisClientType;
        
        const REDIS_URL: string = process.env.REDIS_URL;
        const REDIS_DATABASE_NAME: string = process.env.REDIS_DATABASE_NAME;

        try {
            redisClient = createClient({
                url: REDIS_URL,
                database: parseInt(REDIS_DATABASE_NAME),
            });

            redisClient.on("error", (e) => console.log("Faild to create Redis Client: ", e));
            redisClient.on("connect", () => console.log("Redis Client successfuly created!"));

        } catch (e) {
            throw new Error(e);
        }

        await redisClient.connect();
        console.log("Redis connected to the database successfuly!");

        resolve(redisClient);
    });
}





