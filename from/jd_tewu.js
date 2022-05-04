"use strict";
/**
 * 京东-下拉
 * cron: 15 8,20 * * *
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
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var cookie = '', UserName = '', res = '', message = '', shareCodes = [], shareCodesSelf = [], shareCodesHW = [], black = [];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, activityId, _a, _b, _c, index, value, e_1, encryptProjectId, _d, _e, t, tp, _f, _g, sign, e_2_1, e_3_1, sum, userStarNum, i, e_4, e_5_1, full, _h, _j, _k, index, value, shareCodes_1, shareCodes_1_1, code, e_6_1, e_7_1;
    var e_5, _l, e_3, _m, e_2, _o, e_7, _p, e_6, _q;
    var _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    return __generator(this, function (_6) {
        switch (_6.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _6.sent();
                _6.label = 2;
            case 2:
                _6.trys.push([2, 43, 44, 45]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _6.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 42];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, api('showSecondFloorCardInfo', { "source": "card" })];
            case 4:
                res = _6.sent();
                _6.label = 5;
            case 5:
                _6.trys.push([5, 6, , 8]);
                activityId = res.data.result.activityBaseInfo.activityId;
                return [3 /*break*/, 8];
            case 6:
                e_1 = _6.sent();
                console.log('获取活动信息错误');
                black.push(UserName);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 7:
                _6.sent();
                return [3 /*break*/, 41];
            case 8:
                encryptProjectId = res.data.result.activityBaseInfo.encryptProjectId;
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)
                    // 任务
                ];
            case 9:
                _6.sent();
                return [4 /*yield*/, api('superBrandTaskList', { "source": "card", "activityId": activityId, "assistInfoFlag": 1 })];
            case 10:
                // 任务
                res = _6.sent();
                (0, TS_USER_AGENTS_1.o2s)(res);
                _6.label = 11;
            case 11:
                _6.trys.push([11, 28, 29, 30]);
                _d = (e_3 = void 0, __values(res.data.result.taskList)), _e = _d.next();
                _6.label = 12;
            case 12:
                if (!!_e.done) return [3 /*break*/, 27];
                t = _e.value;
                if (!(t.completionCnt !== t.assignmentTimesLimit)) return [3 /*break*/, 25];
                if (!(((_r = t.ext) === null || _r === void 0 ? void 0 : _r.shoppingActivity) || ((_s = t.ext) === null || _s === void 0 ? void 0 : _s.followShop))) return [3 /*break*/, 15];
                tp = ((_t = t.ext) === null || _t === void 0 ? void 0 : _t.shoppingActivity) || ((_u = t.ext) === null || _u === void 0 ? void 0 : _u.followShop);
                tp = tp[0];
                console.log(tp.title || tp.shopName, tp.itemId);
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": activityId, "encryptProjectId": encryptProjectId, "encryptAssignmentId": t.encryptAssignmentId, "assignmentType": t.assignmentType, "itemId": tp.itemId, "actionType": 0 })];
            case 13:
                res = _6.sent();
                console.log((_v = res.data) === null || _v === void 0 ? void 0 : _v.bizMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 14:
                _6.sent();
                _6.label = 15;
            case 15:
                if (!((_w = t.ext) === null || _w === void 0 ? void 0 : _w.sign2)) return [3 /*break*/, 25];
                _6.label = 16;
            case 16:
                _6.trys.push([16, 23, 24, 25]);
                _f = (e_2 = void 0, __values(t.ext.sign2)), _g = _f.next();
                _6.label = 17;
            case 17:
                if (!!_g.done) return [3 /*break*/, 22];
                sign = _g.value;
                if (!(sign.status === 0 && [10, 18].includes(new Date().getHours()))) return [3 /*break*/, 20];
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": activityId, "encryptProjectId": encryptProjectId, "encryptAssignmentId": t.encryptAssignmentId, "assignmentType": t.assignmentType, "itemId": t.ext.currentSectionItemId, "actionType": 0 })];
            case 18:
                res = _6.sent();
                console.log((_x = res.data) === null || _x === void 0 ? void 0 : _x.bizMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 19:
                _6.sent();
                console.log('下拉任务', (_y = t.ext) === null || _y === void 0 ? void 0 : _y.sign2);
                return [3 /*break*/, 21];
            case 20:
                if (sign.status !== 0) {
                    console.log("".concat(sign.beginTime, " \u7B7E\u5230\u5B8C\u6210"));
                }
                _6.label = 21;
            case 21:
                _g = _f.next();
                return [3 /*break*/, 17];
            case 22: return [3 /*break*/, 25];
            case 23:
                e_2_1 = _6.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 25];
            case 24:
                try {
                    if (_g && !_g.done && (_o = _f["return"])) _o.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 25:
                // 助力码
                if ((_z = t.ext) === null || _z === void 0 ? void 0 : _z.assistTaskDetail) {
                    console.log('助力码：', t.ext.assistTaskDetail.itemId);
                    console.log('收到助力：', (_2 = (_1 = (_0 = t.ext) === null || _0 === void 0 ? void 0 : _0.assistList) === null || _1 === void 0 ? void 0 : _1.length) !== null && _2 !== void 0 ? _2 : 0);
                    shareCodesSelf.push({
                        activityId: activityId,
                        encryptProjectId: encryptProjectId,
                        encryptAssignmentId: t.encryptAssignmentId,
                        itemId: t.ext.assistTaskDetail.itemId
                    });
                }
                _6.label = 26;
            case 26:
                _e = _d.next();
                return [3 /*break*/, 12];
            case 27: return [3 /*break*/, 30];
            case 28:
                e_3_1 = _6.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 30];
            case 29:
                try {
                    if (_e && !_e.done && (_m = _d["return"])) _m.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 30:
                _6.trys.push([30, 38, , 39]);
                if (!(new Date().getHours() === 20)) return [3 /*break*/, 37];
                sum = 0;
                return [4 /*yield*/, api('superBrandSecondFloorMainPage', { "source": "card" })];
            case 31:
                res = _6.sent();
                userStarNum = res.data.result.activityUserInfo.userStarNum;
                console.log('可以抽奖', userStarNum, '次');
                i = 0;
                _6.label = 32;
            case 32:
                if (!(i < userStarNum)) return [3 /*break*/, 36];
                return [4 /*yield*/, api('superBrandTaskLottery', { "source": "card", "activityId": activityId })];
            case 33:
                res = _6.sent();
                if ((_5 = (_4 = (_3 = res.data.result) === null || _3 === void 0 ? void 0 : _3.rewardComponent) === null || _4 === void 0 ? void 0 : _4.beanList) === null || _5 === void 0 ? void 0 : _5.length) {
                    console.log('抽奖获得京豆：', res.data.result.rewardComponent.beanList[0].quantity);
                    sum += res.data.result.rewardComponent.beanList[0].quantity;
                }
                else {
                    console.log('没抽到？', JSON.stringify(res));
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 34:
                _6.sent();
                _6.label = 35;
            case 35:
                i++;
                return [3 /*break*/, 32];
            case 36:
                message += "\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n\u62BD\u5956").concat(userStarNum, "\u6B21\uFF0C\u83B7\u5F97\u4EAC\u8C46").concat(sum, "\n\n");
                _6.label = 37;
            case 37: return [3 /*break*/, 39];
            case 38:
                e_4 = _6.sent();
                console.log('error');
                return [3 /*break*/, 39];
            case 39: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 40:
                _6.sent();
                _6.label = 41;
            case 41:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 42: return [3 /*break*/, 45];
            case 43:
                e_5_1 = _6.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 45];
            case 44:
                try {
                    if (_b && !_b.done && (_l = _a["return"])) _l.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 45:
                (0, TS_USER_AGENTS_1.o2s)(shareCodesSelf);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getshareCodeHW)('tewu')];
            case 46:
                shareCodesHW = _6.sent();
                shareCodes = __spreadArray(__spreadArray([], __read(shareCodesSelf), false), __read(shareCodesHW), false);
                full = [];
                _6.label = 47;
            case 47:
                _6.trys.push([47, 59, 60, 61]);
                _h = __values(cookiesArr.entries()), _j = _h.next();
                _6.label = 48;
            case 48:
                if (!!_j.done) return [3 /*break*/, 58];
                _k = __read(_j.value, 2), index = _k[0], value = _k[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                if (black.includes(UserName)) {
                    console.log('黑号');
                    return [3 /*break*/, 57];
                }
                _6.label = 49;
            case 49:
                _6.trys.push([49, 55, 56, 57]);
                shareCodes_1 = (e_6 = void 0, __values(shareCodes)), shareCodes_1_1 = shareCodes_1.next();
                _6.label = 50;
            case 50:
                if (!!shareCodes_1_1.done) return [3 /*break*/, 54];
                code = shareCodes_1_1.value;
                if (full.includes(code.itemId))
                    return [3 /*break*/, 53];
                console.log("\u8D26\u53F7".concat(index + 1, " ").concat(UserName, " \u53BB\u52A9\u529B ").concat(code.itemId));
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": code.activityId, "encryptProjectId": code.encryptProjectId, "encryptAssignmentId": code.encryptAssignmentId, "assignmentType": 2, "itemId": code.itemId, "actionType": 0 })];
            case 51:
                res = _6.sent();
                if (res.data.bizCode === '0') {
                    console.log('助力成功');
                }
                else if (res.data.bizCode === '103') {
                    console.log('助力满了');
                    full.push(code.itemId);
                }
                else if (res.data.bizCode === '104') {
                    console.log('已助力过');
                }
                else if (res.data.bizCode === '108') {
                    console.log('上限');
                    return [3 /*break*/, 54];
                }
                else if (res.data.bizCode === '2001') {
                    console.log('黑号');
                    return [3 /*break*/, 54];
                }
                else if (res.data.bizCode === '4001') {
                    console.log('助力码过期');
                }
                else {
                    (0, TS_USER_AGENTS_1.o2s)(res, 'error');
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 52:
                _6.sent();
                _6.label = 53;
            case 53:
                shareCodes_1_1 = shareCodes_1.next();
                return [3 /*break*/, 50];
            case 54: return [3 /*break*/, 57];
            case 55:
                e_6_1 = _6.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 57];
            case 56:
                try {
                    if (shareCodes_1_1 && !shareCodes_1_1.done && (_q = shareCodes_1["return"])) _q.call(shareCodes_1);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 57:
                _j = _h.next();
                return [3 /*break*/, 48];
            case 58: return [3 /*break*/, 61];
            case 59:
                e_7_1 = _6.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 61];
            case 60:
                try {
                    if (_j && !_j.done && (_p = _h["return"])) _p.call(_h);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 61: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.post)("https://api.m.jd.com/?uuid=&client=wh5&appid=ProductZ4Brand&functionId=".concat(fn, "&t=").concat(Date.now(), "&body=").concat(encodeURIComponent(JSON.stringify(body))), '', {
                        'Host': 'api.m.jd.com',
                        'Origin': 'https://pro.m.jd.com',
                        'User-Agent': TS_USER_AGENTS_1["default"],
                        'Referer': 'https://pro.m.jd.com/',
                        'Cookie': cookie
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
