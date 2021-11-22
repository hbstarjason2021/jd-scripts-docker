/*
寻找内容鉴赏官
完成任务领京豆
活动地址：https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html
1 1,22 * * * jd_jsg.js
* */
const $ = new Env('内容鉴赏官');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [];
let helpCodeList = [];
//计算京东sign的服务器URL
const getSignUrl = $.isNode() ? (process.env.getSignUrl ? process.env.getSignUrl : '') : '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  $.projectId = 'rfhKVBToUL4RGuaEo7NtSEUw2bA';
  $.helpCode = {'assignmentId': '3PX8SPeYoQMgo1aJBZYVkeC7QzD3', 'type': '2'};
  await getActiveInfo();
  for (let i = 0; i < cookiesArr.length; i++) {
    $.ua = `jdapp;iPhone;10.1.0;14.6;${randomWord(false, 40, 40)};network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222593;appBuild/164324;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E456;supportJDSHWK/1`;
    $.index = i + 1;
    $.cookie = cookiesArr[i];
    $.isLogin = true;
    $.nickName = '';
    $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    await TotalBean();
    console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
    if (!$.isLogin) {
      $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
      if ($.isNode()) {
        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
      }
      continue
    }
    await jd_jsg();
    await $.wait(1000);
  }
  // console.log(JSON.stringify(helpCodeList));
  console.log(`\n================================================开始脚本内互助================================================\n`);
  cookiesArr = getRandomArrayElements(cookiesArr, cookiesArr.length);
  for (let i = 0; i < cookiesArr.length; i++) {
    $.ua = `jdapp;iPhone;10.1.0;14.6;${randomWord(false, 40, 40)};network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222593;appBuild/164324;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E456;supportJDSHWK/1`;
    $.cookie = cookiesArr[i];
    $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.canHelp = true;
    for (let k = 0; k < helpCodeList.length && $.canHelp; k++) {
      $.oneInvite = helpCodeList[k];
      if ($.oneInvite.user === $.UserName || $.oneInvite.max) {
        continue;
      }
      $.helpInfo = {};
      await takePostRequest('helpInfo');
      if ($.helpInfo.code === '106') {
        console.log(`\n助力码：${$.oneInvite.code},助力已满`);
        $.oneInvite.max = true;
        continue;
      }
      if ($.helpInfo.code === '103') {
        console.log(`\n已无助力次数`);
        $.canHelp = false;
        continue;
      }
      if ($.helpInfo.code === '0') {
        console.log(`\n${$.UserName}去助力${$.oneInvite.user}，助力码：${$.oneInvite.code}`);
        await takePostRequest('help');
        await $.wait(6000);
      }
    }
  }
})().catch((e) => {
  $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
  $.done();
});

async function jd_jsg() {
  try {
    for (const item of $.codeFloors) {
      if (!item['ofn']) continue
      if (item['ofn'] !== '4') console.log('\ntaskCode', item['boardParams']['taskCode'])
      if (item['ofn'] === '3' || item['ofn'] === '10' || item['ofn'] === '23' || item['ofn'] === '18' || item['ofn'] === '16' || item['ofn'] === '14') {
        //3：看内容签到
        if (item['ofn'] === '3') {
          $.type = '5';
        } else {
          $.type = '1';
        }
        $.assignmentId = item['boardParams']['taskCode'];
        $.taskInfo = {};
        await takePostRequest('interactive_info');
        if (!$.taskInfo) continue
        if ($.taskInfo.status === "2") {
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || ''},已完成`);
        } else if ($.taskInfo.status === "0") {
          if (item['ofn'] === '3') {
            console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || ''},可获得京豆：${$.taskInfo.current === 7 ? 5 : 2}，去执行`);
          } else {
            console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || ''},可获得京豆：${$.taskInfo.rewardValue}，去执行`);
          }
          await takePostRequest('interactive_done');
          if (Number($.taskInfo.waitDuration) > 0) {
            await $.wait(1000 * $.taskInfo.waitDuration);
          } else {
            await $.wait(2000);
          }
          console.log(`等待6秒钟，防止火爆！\n`)
          await $.wait(1000 * 10);
        }
      } else if (item['ofn'] === '8') {
        //逛发现看内容赢京豆
        $.type = 9;
        $.assignmentId = item['boardParams']['taskCode'];
        $.taskInfo = {};
        await takePostRequest('interactive_info');
        if (!$.taskInfo) continue
        if ($.taskInfo.status === "2") {
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '逛发现看内容赢京豆'},已完成`);
        } else if ($.taskInfo.status === "0" || $.taskInfo.status === "1") {
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '逛发现看内容赢京豆'},可获得京豆：${$.taskInfo.rewardValue}，做任务`);
          await takePostRequest('interactive_done');
          await $.wait(1000 * 5);
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '逛发现看内容赢京豆'},领取奖励`);
          await takePostRequest('interactive_reward');
          console.log(`等待6秒钟，防止火爆！\n`)
          await $.wait(1000 * 6);
        }
      } else if (item['ofn'] === '12') {
        //看精选视频赢京豆
        $.type = '1';
        $.assignmentId = item['boardParams']['taskCode'];
        $.taskInfo = {};
        await takePostRequest('interactive_info');
        if (!$.taskInfo) continue
        if ($.taskInfo.status === "2") {
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '看精选视频赢京豆'},已完成`);
        } else if ($.taskInfo.status === "0") {
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '看精选视频赢京豆'},可获得京豆：${$.taskInfo.rewardValue}，领取任务`);
          if (!getSignUrl) {
            console.log(`\n【看精选视频赢京豆】任务需计算sign,如有计算sign服务器请设置环境变量 getSignUrl\n`);
            continue
          }
          await takePostRequest('interactive_accept');
          await $.wait(1000 * 11);
          console.log(`任务：${$.taskInfo.assignmentName || $.taskInfo.title || '看精选视频赢京豆'},领取奖励`);
          await qryViewkitCallbackResult();
          console.log(`等待6秒钟，防止火爆！\n`)
          await $.wait(1000 * 6);
        }
      } else if (item['ofn'] === '4') {
        $.type = '2';
        $.assignmentId = '3PX8SPeYoQMgo1aJBZYVkeC7QzD3';
        $.taskInfo = {};
        await takePostRequest('interactive_info');
        if (!$.taskInfo) continue
        console.log(`助力码：${$.taskInfo.itemId}`);
        if ($.taskInfo.itemId) helpCodeList.push({
          'user': $.UserName,
          'code': $.taskInfo.itemId,
          'max': false
        });
      } else {
        console.log('ofn', item['ofn'])
        $.msg($.name, '新增任务', '未判断类型任务，请联系作者更新！');
        // if ($.isNode() && $.index === 1) await notify.sendNotify($.name, '发现有新增任务')
      }
    }
    await $.wait(1000);
    await takePostRequest('interactive_rewardInfo');
  } catch (e) {
    $.logErr(e)
  }
}
async function getActiveInfo(url = 'https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html') {
  let options = {
    url,
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
    }
  }
  return new Promise(async resolve => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getActiveInfo API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = data && data.match(/window\.performance.mark\(e\)}}\((.*)\);<\/script>/)
            if (data && data[1]) {
              data = $.toObj(data[1]);
              if (data) {
                const { codeFloors = [] } = data;
                $.codeFloors = codeFloors;
                $.codeFloors.push({"boardParams": {"taskCode": "bWE8RTJm5XnooFr4wwdDM5EYcKP"}, "ofn": "10"})
                $.codeFloors.push({"boardParams": {"taskCode": "26KhtkXmoaj6f37bE43W5kF8a9EL"}, "ofn": "10"})
                $.codeFloors.push({"boardParams": {"taskCode": "2gWnJADG8JXMpp1WXiNHgSy4xUSv"}, "ofn": "10"})
                $.codeFloors.push({"boardParams": {"taskCode": "2bpKT3LMaEjaGyVQRr2dR8zzc9UU"}, "ofn": "8"})
                $.codeFloors.push({"boardParams": {"taskCode": "XTXNrKoUP5QK1LSU8LbTJpFwtbj"}, "ofn": "8"})
              }
            }
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

function qryViewkitCallbackResult() {
  return new Promise(async resolve => {
    const body = {
      "dataSource": "babelInteractive",
      "method": "customDoInteractiveAssignmentForBabel",
      "reqParams": `{\"itemId\":\"${$.taskInfo.itemId}\",\"encryptProjectId\":\"${$.projectId}\",\"encryptAssignmentId\":\"${$.assignmentId}\"}`
    }
    const signRes = await getSign('qryViewkitCallbackResult', body);
    const options = {
      "url": `https://api.m.jd.com/client.action?functionId=qryViewkitCallbackResult&body=${escape(JSON.stringify(body))}&uuid=8888888&client=apple&clientVersion=10.1.2&${signRes}`,
      "body": `body=${escape(JSON.stringify(body))}`,
      "headers":  {
        "Cookie": $.cookie,
        "Accept": `*/*`,
        "Connection": `keep-alive`,
        "Content-Type": `application/x-www-form-urlencoded`,
        "Accept-Encoding": `gzip, deflate, br`,
        "Host": `api.m.jd.com`,
        "User-Agent": "jdapp;iPhone;9.3.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/1C141FDD-C62F-425B-8033-9AAB7E4AE6A3;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167502;jdSupportDarkMode/0;pv/414.19;apprpd/Babel_Native;ref/TTTChannelViewContoller;psq/5;ads/;psn/88732f840b77821b345bf07fd71f609e6ff12f43|1701;jdv/0|iosapp|t_335139774|appshare|CopyURL|1610885480412|1610885486;adk/;app_device/IOS;pap/JA2015_311210|9.3.4|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": `zh-Hans-CN;q=1, en-CN;q=0.9`,
      },
      "timeout": 10000,
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          // console.log('qryViewkitCallbackResult', data)
          data = $.toObj(data);
          if (data && data['code'] === '0') {
            console.log('京豆已到账！')
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
function getSign(function_id, body) {
  return new Promise(async resolve => {
    body = `functionId=${function_id}&body=${escape(JSON.stringify(body))}&uuid=8888888&client=apple&clientVersion=10.1.2`
    const options = {
      url: getSignUrl,
      body: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10 * 1000
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getSign API请求失败，请检查网路重试`)
        } else {
          console.log(`getSign结果：${data}`);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
async function takePostRequest(type) {
  let myRequest = ``;
  let url = '';
  switch (type) {
    case 'interactive_info':
      url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body=[%7B%22type%22:%22${$.type}%22,%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.assignmentId}%22,%22doneHide%22:false%7D]&client=wh5`;
      if ($.type === '2') {
        url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body=[%7B%22type%22:%22${$.type}%22,%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.assignmentId}%22,%22doneHide%22:false,%22helpType%22:%221%22,%22itemId%22:%22%22%7D]&client=wh5`;
      }
      break;
    case 'interactive_done':
      url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body=%7B%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.assignmentId}%22,%22itemId%22:%22${$.taskInfo.itemId}%22,%22type%22:%22${$.type}%22,%22agid%22:[%2205804754%22,%2205822013%22]%7D&client=wh5`;
      break;
    case 'helpInfo':
      url = `https://api.m.jd.com/interactive_info?functionId=interactive_info&appid=contenth5_common&body=[%7B%22type%22:%22${$.helpCode.type}%22,%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.helpCode.assignmentId}%22,%22doneHide%22:false,%22helpType%22:%222%22,%22itemId%22:%22${$.oneInvite.code}%22%7D]&client=wh5`
      break;
    case 'help':
      url = `https://api.m.jd.com/interactive_done?functionId=interactive_done&appid=contenth5_common&body=%7B%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.helpCode.assignmentId}%22,%22type%22:%22${$.helpCode.type}%22,%22itemId%22:%22${$.oneInvite.code}%22,%22agid%22:[%2205804754%22,%2205804886%22]%7D&client=wh5`
      break;
    case "interactive_rewardInfo":
      url = `https://api.m.jd.com/interactive_rewardInfo?functionId=interactive_rewardInfo&appid=contenth5_common&body=%7B%22encryptProjectPoolId%22:%22DhFbbuoB65uR33ntszFgY8raqPQ%22%7D&client=wh5`;
      break;
    case 'interactive_accept':
      url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body={"projectId":"${$.projectId}","assignmentId":"${$.assignmentId}","itemId":"${$.taskInfo.itemId}","type":"${$.type}"}&client=wh5`
      break;
    case 'interactive_reward':
      url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body=%7B%22projectId%22:%22${$.projectId}%22,%22assignmentId%22:%22${$.assignmentId}%22,%22type%22:%22${$.type}%22%7D&client=wh5`;
      break;
    default:
      console.log(`错误${type}`);
  }
  myRequest = getPostRequest(url);
  return new Promise(async resolve => {
    $.post(myRequest, (err, resp, data) => {
      try {
        dealReturn(type, data);
      } catch (e) {
        console.log(data);
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function dealReturn(type, data) {
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(`返回信息异常：${data}\n`);
    return;
  }
  switch (type) {
    case 'interactive_info':
      if (data.code === '0' && data.success && data.data) {
        $.taskInfo = data.data[0];
      } else {
        console.log(JSON.stringify(data));
      }
      break;
    case 'interactive_done':
      if (data.code === '0' && data.success && data.data && data.busiCode === '0') {
        console.log(`执行成功，${data.data.rewardMsg || ''}`);
      } else {
        console.log(JSON.stringify(data));
      }
      break;
    case 'helpInfo':
      if (data.code === '0' && data.success && data.data && data.busiCode === '0') {
        $.helpInfo = data.data[0];
      } else {
        console.log(JSON.stringify(data));
      }
      break;
    case 'help':
      if (data.code === '0' && data.success && data.data && data.busiCode === '0') {
        console.log(`助力成功`);
      }
      console.log(JSON.stringify(data));
      break;
    case 'interactive_accept':
      console.log(JSON.stringify(data));
      break;
    case 'interactive_reward':
      if (data.code === '0' && data.success && data.data && data.busiCode === '0') {
        console.log(`领取成功，${data.data.rewardMsg || ''}`);
      } else {
        console.log(JSON.stringify(data));
      }
      break;
    case 'interactive_rewardInfo':
      if (data.code === '0' && data.success && data.busiCode === '0') {
        console.log(`累积获得京豆：${data.data || '0'}`);
      } else {
        console.log(JSON.stringify(data));
      }
      break;
    default:
      console.log(JSON.stringify(data));
  }
}

function getPostRequest(url) {
  const headers = {
    'Accept': `application/json, text/plain, */*`,
    'Origin': `https://prodev.m.jd.com`,
    'Connection': `keep-alive`,
    'Cookie': $.cookie,
    'Content-Type': `application/x-www-form-urlencoded`,
    'Host': `api.m.jd.com`,
    'User-Agent': $.ua,
    'Referer': `https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html`,
    'Accept-Language': `zh-cn`,
    'Accept-Encoding': `gzip, deflate, br`
  };
  return {url: url, headers: headers, body: ''};
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
        "Cookie": $.cookie,
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
            if (data['retcode'] === 0) {
              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName
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

function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function randomWord(randomFlag, min, max) {
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
