/*
* 美丽研究院，种植园
* 需要手动种植，种植多个时，浇水和施肥只会浇第一个植物
cron 5 5,14 * * * jd_beauty_plantation.js
* */
const $ = new Env('美丽种植园');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [];
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
let userName = '';
let cookie = '';
let message = '';
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        let index = i + 1;
        $.index = index;
        cookie = cookiesArr[i];
        userName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.isLogin = true;
        await TotalBean();
        console.log(`\n*****开始【京东账号${index}】${userName}*****\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${index} ${userName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
            if ($.isNode()) {
                await notify.sendNotify(`cookie已失效 - ${userName}`, `京东账号${index} ${userName}\n请重新登录获取cookie`);
            }
            continue
        }
        await main();
        await $.wait(1000);
    }
    if(message){
        await notify.sendNotify(`种植园`, message);
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
});
async function main() {
  try {
    $.allWater = 0;
    $.token = await getToken(`https://api.m.jd.com/client.action?functionId=isvObfuscator`,'body=%7B%22url%22%3A%22https%3A%5C/%5C/xinruimz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167490&client=apple&clientVersion=9.3.2&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&sign=6eb3237cff376c07a11c1e185761d073&st=1610161927336&sv=102&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D');
    if($.token){
      $.beautyToken = await getBeautyToken('papi/auth',`{"token":"${$.token}","source":"01"}`)
    }
    if($.token && $.beautyToken){
      console.log(`初始化成功`);
    }else{
      console.log(`初始化失败，可能是黑号`);
      return;
    }
    let userInfo = await takeGet('get_user_info');
    let mainInfo = await takeGet('get_home_info');
    if(JSON.stringify(userInfo) === '{}' && JSON.stringify(mainInfo) === '{}'){
      console.log(`获取活动详情失败`);
      return;
    }
    console.log('获取活动详情成功');
    $.allWater = mainInfo.user.store_water;
    console.log(`当前等级：${mainInfo.user.level},共有水滴：${$.allWater},拥有土地：${mainInfo.user.gender}块，用户ID：${mainInfo.user.user_id}`);
    if(mainInfo.user.is_beginner === 1){
      console.log('新用户');
    }
    let plant_info = mainInfo.plant_info;
    let plantList = [];//植物列表
    for(let key in plant_info){
      let onePlant = plant_info[key];
      if(JSON.stringify(onePlant.data) === `{}`){
        continue;
      }
      if(onePlant.water !== '0'){
        console.log(`收取土地：${Number(key)}的水滴`)
        let collectInfo = await takePost('collect_water',`{"position":${Number(key)}}`);
        //if(JSON.stringify(collectInfo) === '{}'){}
        console.log(`收取结果：\n${JSON.stringify(collectInfo)}`)
        await $.wait(1000);
      }
      if(onePlant.data.status === 0){
        plantList.push(onePlant.data);
      }
    }
    if(plantList.length === 0){
      // message +=`账号 ${$.index} ${userName}\n还未种植，请先进京东APP手动种植（美妆馆->美丽研究院->种植园）\n\n`;
    }
    await $.wait(1000);
    await doTask();
    await $.wait(1000);
    //let plantInfo = await takeGet('get_samples');
    //console.log(JSON.stringify(plantInfo));
    let waterTime = Math.floor($.allWater/10);
    console.log(`\n可以浇水：${waterTime}次`);
    for (let i = 0; i < waterTime && plantList.length > 0; i++) {
      let onePlant = plantList[0];
      console.log(`进行一次浇水，${onePlant.name}`);
      let wateringInfo = await takePost('watering',`{"plant_id":${onePlant.id}}`);
      console.log(`浇水成功，当前等级:${wateringInfo.level},目标等级：${wateringInfo.complete_level}，当前等级已浇水：${wateringInfo.progress}，当前等级还需要浇水：${wateringInfo.need_water}`)
      await $.wait(1000);
    }
    for (let i = 0; i < plantList.length; i++) {
      let onePlant = plantList[i];
      let shopMainInfo = await takeGet(`merchant_secondary_pages?shop_id=${onePlant.shop_id}&channel=index`);
      $.allFertilizer = shopMainInfo.user.store_fertilizer;
      await doShopTask(onePlant.shop_id);
      if(shopMainInfo.is_get_fertilizer !== 0){
        console.log(`收取化肥`);
        let collectertilizerInfo = await takePost('collect_fertilizer',`{"shop_id":${onePlant.shop_id}}`);
        console.log(`收取结果：\n${JSON.stringify(collectertilizerInfo)}`);
        await $.wait(1000);
      }

      let fertilizerTime = Math.floor($.allFertilizer/10);
      console.log(`\nshop_id=${onePlant.shop_id}，${onePlant.name},可以施肥：${fertilizerTime}次`);
      for (let i = 0; i < fertilizerTime; i++) {
        console.log(`进行一次施肥，${onePlant.name}`);
        let treeInfo = await takePost('fertilization',`{"plant_id":${Number(onePlant.id)}}`);
        console.log(`施肥成功，当前等级:${treeInfo.level},目标等级：${treeInfo.complete_level}，当前等级已浇水：${treeInfo.progress}，当前等级还需要浇水：${treeInfo.need_water}`)
        await $.wait(1000);
      }
      await $.wait(3000);
    }
  } catch (e) {
    $.logErr(e)
  }
}
async function doShopTask(shop_id){
    let taskStatus = await takeGet(`fertilizer_state?shop_id=${shop_id}`);
    let taskInfo = await takeGet(`fertilizer_task_info?shop_id=${shop_id}`);
    await $.wait(1000);
    let oneInfo = {};
    let doInfo = {};
    let taskList = [];
    let isFinishList = [];
    if(taskStatus.view_shop === 0){
        console.log(`任务：关注浏览店铺，${taskInfo.shop.name}`);
        doInfo = await takeGet(`fertilizer_shop_view?shop_id=${shop_id}`);
        await $.wait(1000);
        console.log(`执行成功，获得肥料：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
        $.allFertilizer = doInfo.store_fertilizer || '0';
    }
    if(Number(taskStatus.exchange) < 5){
        for (let i = taskStatus.exchange; i < 5; i++) {
            console.log(`任务：美妆币兑换`);
            doInfo = await takeGet(`fertilizer_exchange?shop_id=${shop_id}`);
            await $.wait(1000);
            console.log(`执行成功，获得肥料：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
            $.allFertilizer = doInfo.store_fertilizer || '0';
        }
    }
    isFinishList = taskStatus.view_product;
    taskList = taskInfo.prodcuts;
    for (let i = 0; i < taskList.length; i++) {
        oneInfo = taskList[i];
        if(isFinishList.indexOf(oneInfo.id.toString()) === -1){
            console.log(`任务：浏览货品，${oneInfo.name}`);
            doInfo = await takeGet(`fertilizer_product_view?product_id=${oneInfo.id}&shop_id=${shop_id}`);
            await $.wait(1000);
            console.log(`执行成功，获得肥料：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
            $.allFertilizer = doInfo.store_fertilizer || '0';
        }
    }
    isFinishList = taskStatus.view_meetingplace;
    taskList = taskInfo.meetingplaces;
    for (let i = 0; i < taskList.length; i++) {
        oneInfo = taskList[i];
        if(isFinishList.indexOf(oneInfo.id.toString()) === -1){
            console.log(`任务：浏览会场，${oneInfo.name}`);
            doInfo = await takeGet(`fertilizer_meetingplace_view?meetingplace_id=${oneInfo.id}&shop_id=${shop_id}`);
            await $.wait(1000);
            console.log(`执行成功，浏览会场：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
            $.allFertilizer = doInfo.store_fertilizer || '0';
        }
    }
    if(taskStatus.chanel_view === 0){
        console.log(`任务：关注浏览美妆馆`);
        doInfo = await takeGet(`fertilizer_chanel_view?shop_id=${shop_id}`);
        await $.wait(1000);
        console.log(`执行成功，获得肥料：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
        $.allFertilizer = doInfo.store_fertilizer || '0';
    }
    if(taskStatus.sample_view === 0){
        console.log(`任务：看看其他小样`);
        doInfo = await takeGet(`fertilizer_sample_view?shop_id=${shop_id}`);
        await $.wait(1000);
        console.log(`执行成功，获得肥料：${doInfo.inc || 'null'}g，现共有肥料${doInfo.store_fertilizer || 'null'}g`);
        $.allFertilizer = doInfo.store_fertilizer || '0';
    }
}
async function doTask(){
    let taskStatus = await takeGet('water_task_state');
    let taskInfo = await takeGet('water_task_info');
    await $.wait(1000);
    let oneInfo = {};
    let doInfo = {};
    let taskList = [];
    let isFinishList = [];
    isFinishList = taskStatus.view_shop;
    taskList = taskInfo.shops;
    for (let i = 0; i < taskList.length; i++) {
        oneInfo = taskList[i];
        if(isFinishList.indexOf(oneInfo.id.toString()) === -1){
            console.log(`任务：浏览店铺，${oneInfo.name}`);
            doInfo = await takeGet(`water_shop_view?shop_id=${oneInfo.id}`);
            await $.wait(1000);
            console.log(`执行成功，获得水滴：${doInfo.inc || 'null'}滴，现共有水滴${doInfo.store_water || 'null'}滴`);
            $.allWater = doInfo.store_water || '0';
        }
    }

    isFinishList = taskStatus.view_meetingplace;
    taskList = taskInfo.meetingplaces;
    for (let i = 0; i < taskList.length; i++) {
        oneInfo = taskList[i];
        if(isFinishList.indexOf(oneInfo.id.toString()) === -1){
            console.log(`任务：浏览会场，${oneInfo.name}`);
            doInfo = await takeGet(`water_meetingplace_view?meetingplace_id=${oneInfo.id}`);
            await $.wait(1000);
            console.log(`执行成功，获得水滴：${doInfo.inc || 'null'}滴，现共有水滴${doInfo.store_water || 'null'}滴`);
            $.allWater = doInfo.store_water || '0';
        }
    }
    isFinishList = taskStatus.view_product;
    taskList = taskInfo.prodcuts;
    for (let i = 0; i < taskList.length; i++) {
        oneInfo = taskList[i];
        if(isFinishList.indexOf(oneInfo.id.toString()) === -1){
            console.log(`任务：浏览货品，${oneInfo.name}`);
            doInfo = await takeGet(`water_product_view?product_id=${oneInfo.id}`);
            await $.wait(1000);
            console.log(`执行成功，获得水滴：${doInfo.inc || 'null'}滴，现共有水滴${doInfo.store_water || 'null'}滴`);
            $.allWater = doInfo.store_water || '0';
        }
    }
}
function takePost(type,body) {
    let config = {
        url: `https://xinruimz-isv.isvjcloud.com/papi/${type}`,
        body:body,
        headers: {
            'Host': 'xinruimz-isv.isvjcloud.com',
            'Connection':'keep-alive',
            'Accept':'application/x.jd-school-raffle.v1+json',
            'Origin':'thttps://xinruimz-isv.isvjcloud.com',
            'Authorization':`Bearer ${$.beautyToken}`,
            'Source': '02',
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Content-Type':'application/json;charset=UTF-8',
            'Referer': 'https://xinruimz-isv.isvjcloud.com/plantation/',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': `IsvToken=${$.token};jd-beauty-plantation=${$.beautyToken}`,
            'X-Requested-With':'com.jingdong.app.mall'

        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if(data){
                        data = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data || {});
            }
        })
    })
}
function takeGet(type) {
    let config = {
        url: `https://xinruimz-isv.isvjcloud.com/papi/${type}`,
        headers: {
            'Host': 'xinruimz-isv.isvjcloud.com',
            'Connection':'keep-alive',
            'Accept':'application/x.jd-school-raffle.v1+json',
            'Authorization':`Bearer ${$.beautyToken}`,
            'Source': '02',
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Referer': 'https://xinruimz-isv.isvjcloud.com/plantation/',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': `IsvToken=${$.token};jd-beauty-plantation=${$.beautyToken}`

        }
    }
    return new Promise(resolve => {
        $.get(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if(data){
                        data = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data || {});
            }
        })
    })
}
function getBeautyToken(type,body) {
    let config = {
        url: `https://xinruimz-isv.isvjcloud.com/${type}`,
        body: body,
        headers: {
            'Host': 'xinruimz-isv.isvjcloud.com',
            'Accept': 'application/x.jd-school-raffle.v1+json',
            'Source': '02',
            'Accept-Language': 'zh-cn',
            'Content-Type': 'application/json;charset=utf-8',
            'Origin': 'https://xinruimz-isv.isvjcloud.com',
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Referer': 'https://xinruimz-isv.isvjcloud.com/plantation/logined_jd/',
            'Authorization': 'Bearer undefined',
            'Cookie': `IsvToken=${$.token};`
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data.access_token || '');
            }
        })
    })
}
function getToken(url,body) {
    let config = {
        url:  url,
        body: body,
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data['token'] || '');
            }
        })
    })
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
