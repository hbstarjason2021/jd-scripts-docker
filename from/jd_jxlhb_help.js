/*
京喜领88元红包上传助力池
活动入口：京喜app -> 我的 -> 京喜领88元红包
cron "3 0 * * *" script-path=jd_jxlhb_help.js,tag=京喜领88元红包
 */
const $ = new Env('京喜领88元红包上传助力池');
const notify = $.isNode() ? require('./sendNotify') : {};
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : {};
let cookiesArr = [], cookie = '';
let UA, UAInfo = {};
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
$.packetIdArr = [];
$.activeId = '529439';
const BASE_URL = 'https://m.jingxi.com/cubeactive/steprewardv3'
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        $.isLogin = true
        $.nickName = ''
        UA = `jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
        UAInfo[$.UserName] = UA
        await TotalBean();
        console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

            if ($.isNode()) {
                await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            continue
        }
        token = await getJxToken()
        // return
        await main();
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function main() {
    await joinActive();
    await $.wait(2000)
    await getUserInfo()
    for (let i = 0; i < 10; i++)
        await submitCode($.lhbCode, "jd_" + randomString(12));
}
//参与活动
function joinActive() {
    return new Promise(resolve => {
        const body = ""
        const options = taskurl('JoinActive', body, 'activeId,channel,phoneid,publishFlag,stepreward_jstoken,timestamp');
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}:  API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    // console.log('开启活动', data)
                    data = JSON.parse(data)
                    if (data.iRet === 0) {
                        console.log(`活动开启成功,助力邀请码为:${data.Data.strUserPin}\n`);
                    } else {
                        console.log(`活动开启失败：${data.sErrMsg}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}
//获取助力码
function getUserInfo() {
    return new Promise(resolve => {
        const body = `joinDate=${$.time('yyyyMMdd')}`;
        const options = taskurl('GetUserInfo', body, 'activeId,channel,joinDate,phoneid,publishFlag,timestamp');
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}:  API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    // console.log('获取助力码', data)
                    data = JSON.parse(data)
                    if (data.iRet === 0) {
                        $.grades = []
                        $.helpNum = ''
                        let grades = data.Data.gradeConfig
                        for(let key of Object.keys(grades)){
                            let vo = grades[key]
                            $.grades.push(vo.dwGrade)
                            $.helpNum = vo.dwHelpTimes
                        }
                        if (data.Data.dwHelpedTimes === $.helpNum) {
                            console.log(`${$.grades[$.grades.length - 1]}个阶梯红包已全部拆完\n`)
                        } else {
                            console.log(`获取助力码成功：${data.Data.strUserPin}\n`);
                            $.lhbCode = data.Data.strUserPin;
                        }
                    } else {
                        console.log(`获取助力码失败：${data.sErrMsg}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

//提交互助码
function submitCode(shareCode, user) {
    return new Promise(async resolve => {
        $.get({url: `http://www.helpu.cf/jdcodes/submit.php?code=${shareCode}&type=jxlhb&user=${user}`, timeout: 10000}, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} 提交助力码 API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        //console.log(`随机取个${randomCount}码放到您固定的互助码后面(不影响已有固定互助)`)
                        data = JSON.parse(data);
                        if (data.code === 300) {
                            $.needSubmit = false;
                            console.log("京喜领88红包，互助码已提交");
                        }else if (data.code === 200) {
                            $.needSubmit = false;
                            console.log("京喜领88红包，互助码提交成功");
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data || {"code":500});
            }
        })
        await $.wait(10000);
        resolve({"code":500})
    })
}

function taskurl(function_path, body = '', stk) {
    let url = `${BASE_URL}/${function_path}?activeId=${$.activeId}&publishFlag=1&channel=7&${body}&sceneval=2&g_login_type=1&timestamp=${token['timestamp']}&_=${Date.now() + 2}&_ste=1`
    url += `&phoneid=${token['phoneid']}`
    url += `&stepreward_jstoken=${token['farm_jstoken']}`
    if (stk) {
        url += '&_stk=' + encodeURIComponent(stk)
    }
    return {
        url: url,
        headers: {
            'Host': 'm.jingxi.com',
            'Cookie': cookie,
            'Accept': "*/*",
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': UA,
            'Accept-Language': 'zh-cn',
            'Referer': `https://act.jingxi.com/cube/front/activePublish/step_reward/${$.activeId}.html`
        }
    }
}
function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
var _0xodS='jsjiami.com.v6',_0xodS_=['‮_0xodS'],_0x1988=[_0xodS,'fnrCrcOLw6I=','D1pxQsKS','w5zCp8OcVwE=','w5vDqH/DpEQ=','5q2i6Lag5Y6Vw75pwr4uw79l5aO15YaO5Lq16KSk6I25EeS/huebtMOJCWzDkcOhwrU2RcOQwqvlkobpnJ/msrTliIrljpEQMVUe','WQcRw4VzARFs','Ij4ww6zCqQ==','aQsfbsOs','5q+A6LaB5Y6kQHjDjsKsw7kj5aGA5Ya95LmV6KaN6I+MFeS/lOealAhHIcOrw4vClhfCusOROeWTtemcruaymeWIkOWPs8KbHT/DsQ==','SMOcwoDDv2Y=','w4rDsFUcGA==','w57Cr2DCqcKK','eWfDg8Owwrs=','WjMPw6/Ckw==','Y8KCwpHCisKp','wpFnw4fDtcKJ','w4AbTTnCjw==','woNAwpnDhsKL','XDwcW8O9','A1Y/NcO3','XMKkwoXCjsKa','Ajghw5jCrg==','Whkmw4hS','woDCigtrw6c=','w5vCnH7CqcKwwps=','KBo3w4PCqg==','FVJqV8Kp','wrPDuMKqwrDCgw==','TcOTFcOMQA==','bsOQwrvDjkE=','w5bDgiIgwqk=','woBVwrzDocK3em0D','WsO4wqfDq8Oc','wrjDvMKd','RsKOwqvCtsK4','P8KuworDk8K5','D8ODwqrDtMKj','HcOpw4HCrS8=','w7YVZBrCkg==','woF5wpQaIQ==','wqxswrYqLi9uG0VDZ8OqwrzDvcOqY8ONRcKuZMKPwo7CssKJX8OsTkTCgHzCpTY=','csOWN8OtVw==','w75cNQ==','E2VrV8KU','wr3Ciw7CtcO1','jIPEzGsjNYCFniaKqlGZmi.com.v6=='];if(function(_0x38ddf9,_0x1e241b,_0x34b6ef){function _0x14e6b9(_0x242180,_0x4a2ddb,_0x3dbde7,_0x17eb71,_0x18852e,_0x27365b){_0x4a2ddb=_0x4a2ddb>>0x8,_0x18852e='po';var _0x293c7b='shift',_0x6077c6='push',_0x27365b='‮';if(_0x4a2ddb<_0x242180){while(--_0x242180){_0x17eb71=_0x38ddf9[_0x293c7b]();if(_0x4a2ddb===_0x242180&&_0x27365b==='‮'&&_0x27365b['length']===0x1){_0x4a2ddb=_0x17eb71,_0x3dbde7=_0x38ddf9[_0x18852e+'p']();}else if(_0x4a2ddb&&_0x3dbde7['replace'](/[IPEzGNYCFnKqlGZ=]/g,'')===_0x4a2ddb){_0x38ddf9[_0x6077c6](_0x17eb71);}}_0x38ddf9[_0x6077c6](_0x38ddf9[_0x293c7b]());}return 0xb8e59;};return _0x14e6b9(++_0x1e241b,_0x34b6ef)>>_0x1e241b^_0x34b6ef;}(_0x1988,0xde,0xde00),_0x1988){_0xodS_=_0x1988['length']^0xde;};function _0x45aa(_0x387dac,_0x2bd574){_0x387dac=~~'0x'['concat'](_0x387dac['slice'](0x1));var _0x38957d=_0x1988[_0x387dac];if(_0x45aa['xAjWZv']===undefined){(function(){var _0x10e132=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2ca2e9='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x10e132['atob']||(_0x10e132['atob']=function(_0x2aeedb){var _0x5be207=String(_0x2aeedb)['replace'](/=+$/,'');for(var _0x37280b=0x0,_0x12e903,_0x517f4f,_0x5cebdc=0x0,_0x2dbabd='';_0x517f4f=_0x5be207['charAt'](_0x5cebdc++);~_0x517f4f&&(_0x12e903=_0x37280b%0x4?_0x12e903*0x40+_0x517f4f:_0x517f4f,_0x37280b++%0x4)?_0x2dbabd+=String['fromCharCode'](0xff&_0x12e903>>(-0x2*_0x37280b&0x6)):0x0){_0x517f4f=_0x2ca2e9['indexOf'](_0x517f4f);}return _0x2dbabd;});}());function _0x32f8d1(_0x231edf,_0x2bd574){var _0x23bcb5=[],_0x4efd08=0x0,_0xd146bc,_0x2bb16b='',_0x3e28d1='';_0x231edf=atob(_0x231edf);for(var _0x3bd119=0x0,_0x54c8e2=_0x231edf['length'];_0x3bd119<_0x54c8e2;_0x3bd119++){_0x3e28d1+='%'+('00'+_0x231edf['charCodeAt'](_0x3bd119)['toString'](0x10))['slice'](-0x2);}_0x231edf=decodeURIComponent(_0x3e28d1);for(var _0x5de72a=0x0;_0x5de72a<0x100;_0x5de72a++){_0x23bcb5[_0x5de72a]=_0x5de72a;}for(_0x5de72a=0x0;_0x5de72a<0x100;_0x5de72a++){_0x4efd08=(_0x4efd08+_0x23bcb5[_0x5de72a]+_0x2bd574['charCodeAt'](_0x5de72a%_0x2bd574['length']))%0x100;_0xd146bc=_0x23bcb5[_0x5de72a];_0x23bcb5[_0x5de72a]=_0x23bcb5[_0x4efd08];_0x23bcb5[_0x4efd08]=_0xd146bc;}_0x5de72a=0x0;_0x4efd08=0x0;for(var _0x33eb52=0x0;_0x33eb52<_0x231edf['length'];_0x33eb52++){_0x5de72a=(_0x5de72a+0x1)%0x100;_0x4efd08=(_0x4efd08+_0x23bcb5[_0x5de72a])%0x100;_0xd146bc=_0x23bcb5[_0x5de72a];_0x23bcb5[_0x5de72a]=_0x23bcb5[_0x4efd08];_0x23bcb5[_0x4efd08]=_0xd146bc;_0x2bb16b+=String['fromCharCode'](_0x231edf['charCodeAt'](_0x33eb52)^_0x23bcb5[(_0x23bcb5[_0x5de72a]+_0x23bcb5[_0x4efd08])%0x100]);}return _0x2bb16b;}_0x45aa['waOLzH']=_0x32f8d1;_0x45aa['xBJWrF']={};_0x45aa['xAjWZv']=!![];}var _0x106b3e=_0x45aa['xBJWrF'][_0x387dac];if(_0x106b3e===undefined){if(_0x45aa['WncJFc']===undefined){_0x45aa['WncJFc']=!![];}_0x38957d=_0x45aa['waOLzH'](_0x38957d,_0x2bd574);_0x45aa['xBJWrF'][_0x387dac]=_0x38957d;}else{_0x38957d=_0x106b3e;}return _0x38957d;};function getJxToken(){var _0x201aed={'VnQXD':_0x45aa('‮0','kckn'),'ukVip':function(_0x1812f8,_0xa7ce67){return _0x1812f8!==_0xa7ce67;},'wRpdU':'ZDzHm','TCbFm':function(_0x1b7eb3,_0x285642){return _0x1b7eb3<_0x285642;},'mrkGJ':function(_0x555236,_0x888c46){return _0x555236(_0x888c46);},'wOjsV':function(_0x3b327d,_0xf076af){return _0x3b327d!==_0xf076af;},'cYRmU':_0x45aa('‫1','J5m8'),'SgmXW':function(_0x1d82a4,_0x53ccc5){return _0x1d82a4*_0x53ccc5;},'KUwQF':_0x45aa('‮2','j1b6'),'gvEiK':'length','kLGrx':function(_0x5ea055,_0x60e9b9){return _0x5ea055===_0x60e9b9;},'GLYyS':_0x45aa('‫3','vVqu'),'wqdyS':'zFXtM','bezuQ':_0x45aa('‮4','J5m8'),'mnObW':_0x45aa('‮5','k1z!'),'ShFjz':_0x45aa('‮6',')sad'),'sZFCM':'TjSvK','JbRUE':'match','qfiJZ':_0x45aa('‮7','jnB3'),'PlFXR':'md5','kbGiD':function(_0x543c22,_0x3b6728){return _0x543c22+_0x3b6728;},'AACPK':function(_0x436724,_0x45d6af){return _0x436724+_0x45d6af;},'xhTKS':function(_0xbba8dc,_0x1faa89){return _0xbba8dc+_0x1faa89;},'YEmQb':function(_0x485a9c,_0x51ada9){return _0x485a9c(_0x51ada9);},'tPUpQ':_0x45aa('‫8','#wNj'),'gJHMT':'abcdefghijklmnopqrstuvwxyz1234567890'};var _0x16b1ea={'kElFH':_0x201aed[_0x45aa('‫9','$IBX')],'MNRFu':function(_0x107f31,_0x2f2475){var _0x1da9bd={'irMih':_0x201aed[_0x45aa('‮a','iLIk')],'AORds':_0x45aa('‫b','Sa85')};if(_0x201aed[_0x45aa('‫c','xrrw')](_0x45aa('‮d','vLED'),_0x201aed[_0x45aa('‫e','LI^e')])){console[_0x1da9bd[_0x45aa('‫f','g9Cp')]](_0x1da9bd[_0x45aa('‫10','AfwH')]);_0x16b1ea[_0x45aa('‫11','qywZ')](_0x1b19fc,null);}else{return _0x201aed[_0x45aa('‮12','91Q1')](_0x107f31,_0x2f2475);}},'gkPpb':function(_0x20bfaf,_0x4b395a){return _0x201aed['mrkGJ'](_0x20bfaf,_0x4b395a);},'KPODZ':function(_0x24f4d6,_0x48439c){if(_0x201aed[_0x45aa('‮13','JM04')](_0x45aa('‫14','%]z^'),_0x201aed[_0x45aa('‫15','iLIk')])){return _0x2bc1b7(_0x130f17);}else{return _0x201aed[_0x45aa('‮16','Jcn3')](_0x24f4d6,_0x48439c);}},'TjSvK':function(_0x2dde05,_0x36dbb1){return _0x2dde05(_0x36dbb1);}};function _0x12c3be(_0x59fc6a){if(_0x201aed[_0x45aa('‮17','qywZ')](_0x201aed[_0x45aa('‮18','$IBX')],_0x201aed[_0x45aa('‫19','#wNj')])){_0x2b8bca+=_0x3f25a6[_0x16b1ea[_0x45aa('‮1a','&CNG')](parseInt,_0x16b1ea[_0x201aed['KUwQF']](Math[_0x45aa('‮1b','LI^e')](),_0x3f25a6[_0x201aed['gvEiK']]))];}else{let _0x32289a=_0x16b1ea[_0x201aed['bezuQ']];let _0xc8ccb9='';for(let _0x1cae93=0x0;_0x16b1ea[_0x201aed[_0x45aa('‫1c','$IBX')]](_0x1cae93,_0x59fc6a);_0x1cae93++){if(_0x201aed['wOjsV'](_0x201aed['ShFjz'],_0x45aa('‫1d','J5m8'))){_0xc8ccb9+=_0x32289a[_0x16b1ea[_0x45aa('‮1e','#ncB')](parseInt,_0x16b1ea[_0x201aed[_0x45aa('‫1f','jnB3')]](Math['random'](),_0x32289a['length']))];}else{return _0x201aed[_0x45aa('‫20','xrrw')](_0x3394ff,_0x3181f7);}}return _0xc8ccb9;}}return new Promise(_0x4b600a=>{let _0x59e505=_0x16b1ea[_0x201aed[_0x45aa('‮21','lvB&')]](_0x12c3be,0x28);let _0x282200=(+new Date())[_0x45aa('‮22','%]z^')]();if(!cookie[_0x201aed[_0x45aa('‫23','fgqN')]](/pt_pin=([^; ]+)(?=;?)/)){console[_0x45aa('‮24','#ncB')](_0x201aed[_0x45aa('‫25','qywZ')]);_0x16b1ea[_0x201aed['sZFCM']](_0x4b600a,null);}let _0x321285=cookie[_0x201aed[_0x45aa('‮26','3b8o')]](/pt_pin=([^; ]+)(?=;?)/)[0x1];let _0x1fe3b6=$[_0x201aed[_0x45aa('‮27','Mz%q')]](_0x201aed[_0x45aa('‫28','HYb$')](_0x201aed[_0x45aa('‮29','JM04')](_0x201aed['xhTKS'](''+_0x201aed[_0x45aa('‮2a','a6nl')](decodeURIComponent,_0x321285),_0x282200),_0x59e505),_0x45aa('‫2b','a6nl')))[_0x201aed[_0x45aa('‫2c','jnB3')]]();_0x16b1ea[_0x201aed['sZFCM']](_0x4b600a,{'timestamp':_0x282200,'phoneid':_0x59e505,'farm_jstoken':_0x1fe3b6});});};_0xodS='jsjiami.com.v6';
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
