/**
 * 京喜财富岛
 * cron: 40 * * * *
 */

import axios from 'axios'
import {Md5} from 'ts-md5'
import {getDate} from 'date-fns'
import {requireConfig, wait, getJxToken, getBeanShareCode, getFarmShareCode, randomWord, getshareCodeHW, getShareCodePool} from './TS_USER_AGENTS'
import {requestAlgo, geth5st} from "./utils/V3"
import {existsSync, readFileSync} from "fs";

let cookie: string = '', res: any = '', UserName: string, index: number, ua: string = null, account: any[] = []
let shareCode: string[] = [], shareCodeSelf: string[] = [], shareCodeHW: string[] = [], isCollector: Boolean = false, token: any = {}

interface Params {
  strBuildIndex?: string,
  ddwCostCoin?: number,
  taskId?: number,
  dwType?: string,
  configExtra?: string,
  strStoryId?: string,
  triggerType?: number,
  ddwTriggerDay?: number,
  ddwConsumeCoin?: number,
  dwIsFree?: number,
  ddwTaskId?: string,
  strShareId?: string,
  strMarkList?: string,
  dwSceneId?: string,
  strTypeCnt?: string,
  dwUserId?: number,
  ddwCoin?: number,
  ddwMoney?: number,
  dwPrizeLv?: number,
  dwPrizeType?: number,
  strPrizePool?: string,
  dwFirst?: any,
  dwIdentityType?: number,
  strBussKey?: string,
  strMyShareId?: string,
  ddwCount?: number,
  __t?: number,
  strBT?: string,
  dwCurStageEndCnt?: number,
  dwRewardType?: number,
  dwRubbishId?: number,
  strPgtimestamp?: number,
  strPhoneID?: string,
  strPgUUNum?: string,
  showAreaTaskFlag?: number,
  strVersion?: string,
  strIndex?: string
  strToken?: string
  dwGetType?: number,
  ddwSeaonStart?: number,
  size?: number,
  type?: number,
  strLT?: string,
  dwQueryType?: number,
  dwPageIndex?: number,
  dwPageSize?: number,
  dwProperty?: number,
  bizCode?: string,
  dwCardType?: number,
  strCardTypeIndex?: string,
  dwIsReJoin?: number,
}

!(async () => {
  if (existsSync('./utils/account.json')) {
    try {
      account = JSON.parse(readFileSync('./utils/account.json').toString())
    } catch (e) {
      console.log(e)
    }
  }

  await requestAlgo('92a36', 'jdpingou;')
  let cookiesArr: string[] = await requireConfig()
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i]
    UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)![1])
    index = i + 1
    console.log(`\n开始【京东账号${index}】${UserName}\n`)

    ua = 'jdpingou;'
    for (let acc of account) {
      if (acc?.pt_pin.includes(UserName) && acc?.jdpingou) {
        ua = acc.jdpingou
        console.log('指定UA：', ua)
        break
      }
    }

    token = getJxToken(cookie)
    try {
      await makeshareCode()
    } catch (e) {
      console.log(e)
    }


  for (let [index, value] of cookiesArr.entries()) {
    cookie = value
    if (shareCodeHW.length === 0) {
      shareCodeHW = await getshareCodeHW('jxcfd')
    }
    // 获取随机助力码
    let pool: string[] = await getShareCodePool('jxcfd', 30)
    shareCode = Array.from(new Set([...shareCodeSelf, ...shareCodeHW, ...pool]))

    for (let code of shareCode) {
      UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)![1])
      console.log(`【账号${index + 1}】 ${UserName} 去助力 ${code}`)
      res = await api('story/helpbystage', '_cfd_t,bizCode,dwEnv,ptag,source,strShareId,strZone', {strShareId: code})
      if (res.iRet === 0) {
        console.log('助力成功:', res.Data.GuestPrizeInfo.strPrizeName)
      } else if (res.iRet === 2190 || res.sErrMsg === '达到助力上限') {
        console.log('上限')
        break
      } else if (res.iRet === 1023) {
        console.log('信号弱')
        break
      } else if (res.iRet === 2191) {
        console.log('已助力')
      } else {
        console.log('其他错误:', res)
      }
      await wait(3000)
    }
  }
})()

async function api(fn: string, stk: string, params: Params = {}, taskPosition = '') {
  let timestamp: number = Date.now()

  let url: string, t: { key: string, value: string } [] = [
    {key: 'strZone', value: 'jxbfd'},
    {key: 'source', value: 'jxbfd'},
    {key: 'dwEnv', value: '7'},
    {key: 'ptag', value: ''},
    {key: '_cfd_t', value: timestamp.toString()},
  ]

  if (['GetUserTaskStatusList', 'Award', 'DoTask'].includes(fn)) {
    let bizCode: string
    if (!params.bizCode) {
      bizCode = taskPosition === 'right' ? 'jxbfddch' : 'jxbfd'
    } else {
      bizCode = params.bizCode
    }
    url = `https://m.jingxi.com/newtasksys/newtasksys_front/${fn}?strZone=jxbfd&bizCode=${bizCode}&source=jxbfd&dwEnv=7&_cfd_t=${timestamp}&ptag=&_stk=${encodeURIComponent(stk)}&_ste=1&_=${Date.now()}&sceneval=2&g_login_type=1&callback=jsonpCBK${randomWord()}&g_ty=ls`
  } else {
    url = `https://m.jingxi.com/jxbfd/${fn}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=${timestamp}&ptag=&_stk=${encodeURIComponent(stk)}&_ste=1&_=${timestamp}&sceneval=2&g_login_type=1&callback=jsonpCBK${randomWord()}&g_ty=ls`
  }
  for (let [key, value] of Object.entries(params)) {
    t.push({key, value})
    url += `&${key}=${value}`
  }
  let h5st = geth5st(t, '92a36')
  url += `&h5st=${encodeURIComponent(h5st)}`

  let {data} = await axios.get(url, {
    headers: {
      'Host': 'm.jingxi.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
      'User-Agent': ua,
      'Referer': 'https://st.jingxi.com/',
      'Cookie': cookie + 'cid=4;'
    }
  })
  try {
    return JSON.parse(data.match(/jsonpCBK.?\(([^)]*)/)![1])
  } catch (e) {
    console.log(data)
    return ''
  }
}

async function task() {
  console.log('刷新任务列表')
  res = await api('GetUserTaskStatusList', '_cfd_t,bizCode,dwEnv,ptag,showAreaTaskFlag,source,strZone,taskId', {taskId: 0, showAreaTaskFlag: 1})
  await wait(2000)
  for (let t of res.data.userTaskStatusList) {
    if (t.awardStatus === 2 && t.completedTimes === t.targetTimes) {
      console.log('可领奖:', t.taskName)
      res = await api('Award', '_cfd_t,bizCode,dwEnv,ptag,source,strZone,taskId', {taskId: t.taskId, bizCode: t.bizCode})
      await wait(2000)
      if (res.ret === 0) {
        try {
          res = JSON.parse(res.data.prizeInfo)
          console.log(`领奖成功:`, res.ddwCoin, res.ddwMoney)
        } catch (e) {
          console.log('领奖成功:', res)
        }
        await wait(1000)
        return 1
      } else {
        console.log('领奖失败:', res)
        return 0
      }
    }
    if (t.dateType === 2 && t.awardStatus === 2 && t.completedTimes < t.targetTimes && t.taskCaller === 1) {
      console.log('做任务:', t.taskId, t.taskName, t.completedTimes, t.targetTimes)
      res = await api('DoTask', '_cfd_t,bizCode,configExtra,dwEnv,ptag,source,strZone,taskId', {taskId: t.taskId, configExtra: '', bizCode: t.bizCode})
      await wait(5000)
      if (res.ret === 0) {
        console.log('任务完成')
        return 1
      } else {
        console.log('任务失败')
        return 0
      }
    }
  }
  return 0
}

async function makeshareCode() {
  try {
    res = await api('user/QueryUserInfo', '_cfd_t,bizCode,ddwTaskId,dwEnv,ptag,source,strPgUUNum,strPgtimestamp,strPhoneID,strShareId,strVersion,strZone', {
      ddwTaskId: '',
      strShareId: '',
      strMarkList: 'undefined',
      strPgUUNum: token.strPgUUNum,
      strPgtimestamp: token.strPgtimestamp,
      strPhoneID: token.strPhoneID,
      strVersion: '1.0.1'
    })
    console.log('助力码:', res.strMyShareId)
    shareCodeSelf.push(res.strMyShareId)
    let bean: string = await getBeanShareCode(cookie)
    let farm: string = await getFarmShareCode(cookie)
    let pin: string = Md5.hashStr(cookie.match(/pt_pin=([^;]*)/)![1])
    let {data}: any = await axios.get(`https://sharecodepool.cnmb.win/api/autoInsert/jxcfd?sharecode=${res.strMyShareId}&bean=${bean}&farm=${farm}&pin=${pin}`)
    console.log(data.message)
  } catch (e) {
    console.log('自动提交失败')
    console.log(e)
  }
}
