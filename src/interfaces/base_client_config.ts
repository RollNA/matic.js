export interface IBaseClientConfig {
    network: string;
    version: string;
    parent?: {
        name: string;
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    child?: {
        name: string;
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    log?: boolean;
    requestConcurrency?: number;

}
