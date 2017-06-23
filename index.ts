import * as qiniu from 'qiniu';

export interface QiniuOptions {
    accessKey: string;
    secretKey: string;
    bucket: string;
    origin: string;
}
export default class Qiniu {
    private options: QiniuOptions;

    constructor(options: QiniuOptions) {
        this.options = options;
        qiniu.conf.ACCESS_KEY = options.accessKey;
        qiniu.conf.SECRET_KEY = options.secretKey;
    }

    getToken(options?: any) {
        const policy = new qiniu.rs.PutPolicy(this.options.bucket);
        if (options) {
            Object.keys(options).forEach(key => {
                policy[key] = options[key];
            });
        }
        return policy.token();
    }

    putFile(path: string, token?: any, key?: any, options?: any): Promise<any> {
        const extra = new qiniu.io.PutExtra();
        if (!token) {
            token = this.getToken();
        }
        if (options) {
            Object.keys(options).forEach(key => {
                extra[key] = options[key];
            });
        }
        return new Promise((resolve, reject) => {
            qiniu.io.putFile(token, key, path, extra, (e, ret) => {
                e ? reject(e) : resolve(ret);
            });
        });
    }

    put(data?: any, token?: any, key?: any, options?: any): Promise<any> {
        const extra = new qiniu.io.PutExtra();
        if (!token) {
            token = this.getToken();
        }
        if (options) {
            Object.keys(options).forEach(key => {
                extra[key] = options[key];
            });
        }
        return new Promise((resolve, reject) => {
            qiniu.io.put(token, key, data, extra, (e, ret) => {
                e ? reject(e) : resolve(ret);
            });
        });
    }

    getPublicURL(key: string) {
        return `${this.options.origin}/${key}`;
    }

    getPrivateURL(url: string, expiresIn: number) {
        const policy = new qiniu.rs.GetPolicy(expiresIn);
        return policy.makeRequest(url);
    }
}