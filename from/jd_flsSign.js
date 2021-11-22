/*
京东小家福利社签到
活动地址：https://pro.m.jd.com/mall/active/3X4HMWmUigG689ZUZAg3Yo8Wtqf5/index.html，活动已过期
活动地址2：https://pro.m.jd.com/mall/active/3joSPpr7RgdHMbcuqoRQ8HbcPo9U/index.html 2021年9月10日-2021年12月31日
1.每日签到：每个用户限每日签到一次；
2.连续签到奖励：第一天签到可领取5个京豆，连续签到第四天可领取10个京豆， 其他连续签到日（连续签到第2、3、5、6日）均可获得5个京豆；连续七日签到可领取京豆超级大礼包；
3.先抢先得：签到活动每日每小时限量发放京豆，先抢先得，每小时发完，可等下一小时开始再来；
5.活动时间：本轮签到活动时间为 例：2021年9月16日-2021年9月30日；

0 0,1 * * * jd_flsSign.js

 */
const $ = new Env('京东小家福利社签到');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  try {
    let promiseArr = cookiesArr.map((ck, index) => getActInfo(ck, index, 'https://pro.m.jd.com/mall/active/3joSPpr7RgdHMbcuqoRQ8HbcPo9U/index.html'));
    await Promise.all(promiseArr);
    // promiseArr = cookiesArr.map((ck, index) => getActInfo(ck, index, 'https://pro.m.jd.com/mall/active/3joSPpr7RgdHMbcuqoRQ8HbcPo9U/index.html'));
    // await Promise.all(promiseArr);
  } catch (e) {
    $.logErr(e)
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
function getActInfo(taskCookie, index, url='https://pro.m.jd.com/mall/active/3X4HMWmUigG689ZUZAg3Yo8Wtqf5/index.html') {
  if (index === 0) console.log(`活动地址：${url}`)
  const userName = decodeURIComponent(taskCookie.match(/pt_pin=([^; ]+)(?=;?)/) && taskCookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  return new Promise(resolve => {
    $.get({
      url: url,
      headers:{
        'Cookie': taskCookie,
        'User-Agent': "jdapp;iPhone;9.3.0;14.2;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/0E38E9F1-4B4C-40A4-A479-DD15E58A5623;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167436;pushNoticeIsOpen/0;jdSupportDarkMode/0;pv/142.46;apprpd/CouponCenter;ref/NewCouponCenterViewController;psq/44;ads/;psn/88732f840b77821b345bf07fd71f609e6ff12f43|551;jdv/0|kong|t_1000170135|tuiguang|notset|1607732510603|1607732510;adk/;app_device/IOS;pap/JA2015_311210|9.2.5|IOS 14.2;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1 Edg/89.0.4389.90",
      }
    },async (err,resp,data)=>{
      try {
        data = data.match(/window.__react_data__ = (.*)}\n/);
        if (data && data[1]) {
          data = $.toObj(data[1] + '}');
          if (data) {
            let paramsArr = data.activityData.floorList.filter(vo => vo.template === 'signIn');
            if (paramsArr && paramsArr[0]) {
              const { params = "" } = paramsArr[0]["signInfos"];
              if (!params) {
                console.log(`京东账号${index + 1} ${userName} 获取签到所需params失败，退出签到！\n`);
                return
              }
              await sign(taskCookie, index, params);
            } else {
              console.log(`paramsArr获取失败：${$.toStr(paramsArr)}\n`);
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
      finally {
        resolve()
      }
    })
  })
}

function sign(taskCookie, index, params) {
  return new Promise(resolve => {
    const body = {
      "params": params,
      "riskParam": {
        "platform": "3",
        "orgType": "2",
        "openId": "-1",
        "pageClickKey": "Babel_Sign",
        "eid": "",
        "fp": "-1",
        "shshshfp": "",
        "shshshfpa": "",
        "shshshfpb": "",
        "childActivityUrl": "https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2Fc46tGzwvXueH7uKSjpXmPQP9Nod%2Findex.html",
        "userArea": "-1",
        "client": "",
        "clientVersion": "",
        "uuid": "",
        "osVersion": "",
        "brand": "",
        "model": "",
        "networkType": "",
        "jda": "-1"
      },
      "siteClient": "apple",
      "mitemAddrId": "",
      "geo": {"lng": "", "lat": ""},
      "addressId": "",
      "posLng": "",
      "posLat": "",
      "homeLng": "",
      "homeLat": "",
      "focus": "",
      "innerAnchor": "",
      "cv": "2.0"
    }
    const options = {
      url: `${JD_API_HOST}?functionId=userSign`,
      body: `body=${encodeURIComponent(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0`,
      headers: {
        'Host': 'api.m.jd.com',
        'user-agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        'accept': '*/*',
        'referer': 'https://pro.m.jd.com/',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': taskCookie
      }
    }

    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log($.toStr(err));
        } else {
          // console.log(`签到结果`, data)
          const userName = decodeURIComponent(taskCookie.match(/pt_pin=([^; ]+)(?=;?)/) && taskCookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
          data = $.toObj(data);
          if (data) {
            if (data['code'] === '0' && data['msg'] === 'SUCCESS') {
              console.log(`京东账号${index + 1} ${userName} ${data['signText']}，${data['btnText']}`);
              if (data['awardList']) {
                for (const item of data['awardList']) {
                  console.log(`京东账号${index + 1} ${userName} 已获得：${item['text']}\n`);
                }
              }
            } else {
              console.log(`京东账号${index + 1} ${userName} 签到失败：${$.toStr(data)}\n`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
