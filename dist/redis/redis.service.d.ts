export declare class RedisService {
    private readonly redisClient;
    constructor();
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<Array<object> | string>;
}
