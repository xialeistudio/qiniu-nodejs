"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qiniu = require("qiniu");
var Qiniu = (function () {
    function Qiniu(options) {
        this.options = options;
        qiniu.conf.ACCESS_KEY = options.accessKey;
        qiniu.conf.SECRET_KEY = options.secretKey;
    }
    Qiniu.prototype.getToken = function (options) {
        var policy = new qiniu.rs.PutPolicy(this.options.bucket);
        if (options) {
            Object.keys(options).forEach(function (key) {
                policy[key] = options[key];
            });
        }
        return policy.token();
    };
    Qiniu.prototype.putFile = function (path, token, key, options) {
        var extra = new qiniu.io.PutExtra();
        if (!token) {
            token = this.getToken();
        }
        if (options) {
            Object.keys(options).forEach(function (key) {
                extra[key] = options[key];
            });
        }
        return new Promise(function (resolve, reject) {
            qiniu.io.putFile(token, key, path, extra, function (e, ret) {
                e ? reject(e) : resolve(ret);
            });
        });
    };
    Qiniu.prototype.put = function (data, token, key, options) {
        var extra = new qiniu.io.PutExtra();
        if (!token) {
            token = this.getToken();
        }
        if (options) {
            Object.keys(options).forEach(function (key) {
                extra[key] = options[key];
            });
        }
        return new Promise(function (resolve, reject) {
            qiniu.io.put(token, key, data, extra, function (e, ret) {
                e ? reject(e) : resolve(ret);
            });
        });
    };
    Qiniu.prototype.getPublicURL = function (key) {
        return this.options.origin + "/" + key;
    };
    Qiniu.prototype.getPrivateURL = function (url, expiresIn) {
        var policy = new qiniu.rs.GetPolicy(expiresIn);
        return policy.makeRequest(url);
    };
    return Qiniu;
}());
exports.default = Qiniu;
//# sourceMappingURL=index.js.map