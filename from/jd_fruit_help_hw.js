"use strict";
/**
 * 京东-东东农场-助力
 * 所有CK助力顺序
 * 内部 -> 助力池
 * 和jd_fruit.js同方法自己设置内部码
 * 如果没有添加内部码，直接助力助力池
 * cron: 35 0,3,5 * * *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var date_fns_1 = require("date-fns");
var cookie = '', res = '', data, UserName;
var shareCodeSelf = [], shareCodePool = [], shareCode = [], shareCodeFile = require('./jdFruitShareCodes');
var message = '', log = { help: '', runTimes: '' };
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, i, today, e_1, e_2, shareCodeSelf_1, shareCodeSelf_1_1, code, e_3_1, farmAssistInit_waterEnergy, _d, _e, t, e_4_1, e_5_1;
    var e_5, _f, e_3, _g, e_4, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _j.sent();
                _j.label = 2;
            case 2:
                _j.trys.push([2, 43, 44, 45]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _j.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 42];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                message += "\u3010\u8D26\u53F7".concat(index + 1, "\u3011  ").concat(UserName, "\n");
                log.help += "\u3010\u8D26\u53F7".concat(index + 1, "\u3011  ").concat(UserName, "\n");
                log.runTimes += "\u3010\u8D26\u53F7".concat(index + 1, "\u3011  ").concat(UserName, "\n");
                if (Object.keys(shareCodeFile)[index]) {
                    shareCodeSelf = shareCodeFile[Object.keys(shareCodeFile)[index]].split('@');
                }
                (0, TS_USER_AGENTS_1.o2s)(shareCodeSelf, "\u7B2C".concat(index + 1, "\u4E2A\u8D26\u53F7\u83B7\u53D6\u7684\u5185\u90E8\u4E92\u52A9"));
                return [4 /*yield*/, api('initForFarm', { "version": 11, "channel": 3 })];
            case 4:
                res = _j.sent();
                if (!(res.code === '6')) return [3 /*break*/, 6];
                console.log('黑号');
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 5:
                _j.sent();
                return [3 /*break*/, 41];
            case 6:
                _j.trys.push([6, 14, , 15]);
                console.log('助力码', res.farmUserPro.shareCode);
                i = 0;
                _j.label = 7;
            case 7:
                if (!(i < 5)) return [3 /*break*/, 13];
                _j.label = 8;
            case 8:
                _j.trys.push([8, 10, , 12]);
                today = (0, date_fns_1.getDate)(new Date());
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.get)("https://sharecodepool.cnmb.win/api/runTimes0917?activityId=farm&sharecode=".concat(res.farmUserPro.shareCode, "&today=").concat(today))];
            case 9:
                res = _j.sent();
                console.log(res);
                log.runTimes += "\u7B2C".concat(i + 1, "\u6B21").concat(res, "\n");
                return [3 /*break*/, 13];
            case 10:
                e_1 = _j.sent();
                console.log("\u7B2C".concat(i + 1, "\u6B21\u4E0A\u62A5\u5931\u8D25"), e_1);
                log.runTimes += "\u7B2C".concat(i + 1, "\u6B21\u4E0A\u62A5\u5931\u8D25 ").concat(typeof e_1 === 'object' ? JSON.stringify(e_1) : e_1, "\n");
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)((0, TS_USER_AGENTS_1.getRandomNumberByRange)(10000, 30000))];
            case 11:
                _j.sent();
                return [3 /*break*/, 12];
            case 12:
                i++;
                return [3 /*break*/, 7];
            case 13: return [3 /*break*/, 15];
            case 14:
                e_2 = _j.sent();
                console.log('获取助力码失败，黑号？');
                return [3 /*break*/, 41];
            case 15: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)
                // 助力
            ];
            case 16:
                _j.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getShareCodePool)('farm', 50)];
            case 17:
                // 助力
                shareCodePool = _j.sent();
                shareCode = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodeSelf), false), __read(shareCodePool), false)));
                _j.label = 18;
            case 18:
                _j.trys.push([18, 24, 25, 26]);
                shareCodeSelf_1 = (e_3 = void 0, __values(shareCodeSelf)), shareCodeSelf_1_1 = shareCodeSelf_1.next();
                _j.label = 19;
            case 19:
                if (!!shareCodeSelf_1_1.done) return [3 /*break*/, 23];
                code = shareCodeSelf_1_1.value;
                console.log("\u8D26\u53F7 ".concat(UserName, " \u53BB\u52A9\u529B ").concat(code, " ").concat(shareCodeSelf.includes(code) ? '*内部*' : ''));
                return [4 /*yield*/, api('initForFarm', { "mpin": "", "utm_campaign": "t_335139774", "utm_medium": "appshare", "shareCode": code, "utm_term": "Wxfriends", "utm_source": "iosapp", "imageUrl": "", "nickName": "", "version": 14, "channel": 2, "babelChannel": 0 })];
            case 20:
                res = _j.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 21:
                _j.sent();
                if (res.helpResult.code === '7') {
                    console.log('不给自己助力');
                }
                else if (res.helpResult.code === '0') {
                    console.log('助力成功,获得', res.helpResult.salveHelpAddWater);
                    log.help += "\u52A9\u529B\u6210\u529F ".concat(code, " ").concat(shareCodeSelf.includes(code) ? '*内部*' : '', "\n");
                }
                else if (res.helpResult.code === '8') {
                    console.log('上限');
                    return [3 /*break*/, 23];
                }
                else if (res.helpResult.code === '9') {
                    console.log('已助力');
                    log.help += "\u5DF2\u52A9\u529B ".concat(code, " ").concat(shareCodeSelf.includes(code) ? '*内部*' : '', "\n");
                }
                else if (res.helpResult.code === '10') {
                    console.log('已满');
                }
                else if (res.helpResult.remainTimes === 0) {
                    console.log('次数用完');
                    return [3 /*break*/, 23];
                }
                _j.label = 22;
            case 22:
                shareCodeSelf_1_1 = shareCodeSelf_1.next();
                return [3 /*break*/, 19];
            case 23: return [3 /*break*/, 26];
            case 24:
                e_3_1 = _j.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 26];
            case 25:
                try {
                    if (shareCodeSelf_1_1 && !shareCodeSelf_1_1.done && (_g = shareCodeSelf_1["return"])) _g.call(shareCodeSelf_1);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 26: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)
                // 助力奖励
            ];
            case 27:
                _j.sent();
                return [4 /*yield*/, api('farmAssistInit', { "version": 14, "channel": 1, "babelChannel": "120" })];
            case 28:
                // 助力奖励
                res = _j.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 29:
                _j.sent();
                (0, TS_USER_AGENTS_1.o2s)(res, 'farmAssistInit');
                farmAssistInit_waterEnergy = 0;
                _j.label = 30;
            case 30:
                _j.trys.push([30, 37, 38, 39]);
                _d = (e_4 = void 0, __values(res.assistStageList)), _e = _d.next();
                _j.label = 31;
            case 31:
                if (!!_e.done) return [3 /*break*/, 36];
                t = _e.value;
                if (!(t.percentage === '100%' && t.stageStaus === 2)) return [3 /*break*/, 34];
                return [4 /*yield*/, api('receiveStageEnergy', { "version": 14, "channel": 1, "babelChannel": "120" })];
            case 32:
                data = _j.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 33:
                _j.sent();
                farmAssistInit_waterEnergy += t.waterEnergy;
                return [3 /*break*/, 35];
            case 34:
                if (t.stageStaus === 3) {
                    farmAssistInit_waterEnergy += t.waterEnergy;
                }
                _j.label = 35;
            case 35:
                _e = _d.next();
                return [3 /*break*/, 31];
            case 36: return [3 /*break*/, 39];
            case 37:
                e_4_1 = _j.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 39];
            case 38:
                try {
                    if (_e && !_e.done && (_h = _d["return"])) _h.call(_d);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 39:
                console.log('收到助力', res.assistFriendList.length);
                console.log('助力已领取', farmAssistInit_waterEnergy);
                message += "\u3010\u52A9\u529B\u5DF2\u9886\u53D6\u3011  ".concat(farmAssistInit_waterEnergy, "\n");
                message += '\n\n';
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 40:
                _j.sent();
                _j.label = 41;
            case 41:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 42: return [3 /*break*/, 45];
            case 43:
                e_5_1 = _j.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 45];
            case 44:
                try {
                    if (_b && !_b.done && (_f = _a["return"])) _f.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 45:
                if (message) {
                    console.log('===================');
                    console.log(message);
                    console.log('===================');
                }
                console.log(log.help);
                console.log(log.runTimes);
                return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://api.m.jd.com/client.action?functionId=".concat(fn, "&body=").concat(JSON.stringify(body), "&appid=wh5&client=apple&clientVersion=10.2.4"), {
                        headers: {
                            "Host": "api.m.jd.com",
                            "Origin": "https://carry.m.jd.com",
                            "User-Agent": TS_USER_AGENTS_1["default"],
                            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                            "Referer": "https://carry.m.jd.com/",
                            "Cookie": cookie
                        }
                    })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
