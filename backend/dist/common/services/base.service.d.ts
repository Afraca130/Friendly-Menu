export declare abstract class BaseService {
    protected handleAsync<T>(operation: () => Promise<T>, errorMessage?: string): Promise<T>;
}
