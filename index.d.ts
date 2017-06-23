export interface QiniuOptions {
    accessKey: string;
    secretKey: string;
    bucket: string;
    origin: string;
}
export default class Qiniu {
    private options;
    constructor(options: QiniuOptions);
    getToken(options?: any): string;
    putFile(path: string, token?: any, key?: any, options?: any): Promise<any>;
    put(data?: any, token?: any, key?: any, options?: any): Promise<any>;
    getPublicURL(key: string): string;
    getPrivateURL(url: string, expiresIn: number): string;
}
