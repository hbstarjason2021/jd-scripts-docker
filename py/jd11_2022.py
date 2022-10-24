from email import header
import os
import urllib
import requests
import time
import json
import random
import re
from urllib import parse
import urllib3
import sys
from datetime import datetime
urllib3.disable_warnings()

# 循环任务次数，可以多跑几次没事
task_times = 5
# 间隔时间，默认在任务所需的基础上加，一般设置5s左右就成，看自己
sleep_times = 5


Cookies = [
    'pt_key=xxxx; pt_pin=xxxx;',
    'pt_key=xxxx; pt_pin=xxxx;',
]

class Logger(object):
    def __init__(self, filename='app.log', stream=sys.stdout):
        self.terminal = stream
        self.log = open(filename, 'a', encoding='utf-8')

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)
        self.terminal.flush()  # 不启动缓冲,实时输出
        self.log.flush()

    def flush(self):
        pass

today = datetime.now().strftime("%Y-%m-%d")
sys.stdout = Logger(f'./jd11-{today}.log', sys.stdout)
sys.stderr = Logger(f'./jd11-{today}.log', sys.stderr)

try:
    pass
    # with open('ck.txt', 'r+', encoding='utf-8') as ef:
    #    for i in ef:
    #        i = i.strip('\r\n')
    #        Cookies.append(i)
except:
    print('看看有ck.txt文件没，看看放cookie没')
    time.sleep(5)
    sys.exit()
if Cookies:
    pass
else:
    print('看看放cookie没')
    time.sleep(5)
    sys.exit()


def get_user_name(headers):
    cookie = headers['Cookie'] if 'Cookie' in headers else 'None'
    try:
        r = re.compile(r"pt_pin=(.*?);")
        userName = r.findall(cookie)
        userName = parse.unquote(userName[0])
        return userName
    except Exception as e:
        r = re.compile(r"pin=(.*?);")
        userName = r.findall(cookie)
        userName = parse.unquote(userName[0])
        return userName

# 获取joytoken
def get_joytoken(headers):
    url = 'https://rjsb-token-m.jd.com/gettoken'
    data = "content={\"appname\":\"50168\",\"whwswswws\":\"\",\"jdkey\":\"a\",\"body\":{\"platform\":\"1\",\"sceneid\":\"CXJAssist_h5\",\"hs\":\"AAD71C9\",\"version\":\"w4.0.5\"}}"
    try:
        res = requests.post(url, headers=headers,
                            data=data, verify=False).json()
        joytoken = res.get('joyytoken')
        return joytoken
    except Exception as e:
        print(e)
        return None

print('\n\n欢迎使用jd脚本\n')

def get_secretp(headers):
    url = 'https://api.m.jd.com/client.action?advId=promote_getHomeData'
    data = 'functionId=promote_getHomeData&client=m&clientVersion=-1&appid=signed_wh5&body={}'
    try:
        res = requests.post(url, data=data, headers=headers,
                            verify=False, timeout=5).json()
        if res.get('data').get('bizCode') == 0:
            return res.get('data').get('result').get('homeMainInfo').get('secretp')
        else:
            print('初始化失败')
            return None
    except:
        return None

def get_ss():
    import random,string
    a = [''.join(random.sample(string.ascii_letters + string.digits, 8)),"-1"]
    return a

# 逛店
def guangdian(taskId, taskToken, itemId, headers,actionType):
    url = 'https://api.m.jd.com/client.action?advId=promote_collectScore'
    ss = get_ss()
    body = {
        "taskId": taskId,
        "taskToken": taskToken,
        "actionType": actionType,
        "random": ss[0],
        "log": ss[1]
    }
    bodys = json.dumps(body).replace(" ", "")
    data = 'functionId=promote_collectScore&client=m&clientVersion=-1&appid=signed_wh5&body=' + bodys
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        if res.get('data').get('bizCode') == 0:
            print('进店成功')
            return res
        else:
            print(res.get('data').get('bizMsg'))
    except Exception as e:
        print(e)

# 领取


def lingqu(taskToken, headers):
    url = 'https://api.m.jd.com/client.action?functionId=qryViewkitCallbackResult&client=wh5'
    body = {
        'dataSource': "newshortAward",
        'method': "getTaskAward",
        'reqParams': "{\"taskToken\":\"%s\"}" % taskToken,
        'sdkVersion': "1.0.0",
        'clientLanguage': "zh",
    }
    bodys = json.dumps(body)
    data = {
        'body': bodys,
    }
    try:
        response = requests.post(url, headers=headers,
                                 data=data, verify=False, timeout=5).json()
        if response.get('code') == '0':
            print(response.get('toast').get('subTitle'))
        else:
            print('其他')
    except Exception as e:
        print(e)

# 加购


def getFeedDetail(taskId, headers):
    url = 'https://api.m.jd.com/client.action?functionId=promote_getFeedDetail'
    data = 'functionId=promote_getFeedDetail&client=m&clientVersion=-1&appid=signed_wh5&body={"taskId":"%s"}' % taskId
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        productInfoVos = res.get('data').get('result').get(
            'addProductVos')[0].get('productInfoVos')
        return productInfoVos
    except Exception as e:
        print(e)
# 加购


def getFeedDetail1(taskId, headers):
    url = 'https://api.m.jd.com/client.action?functionId=promote_getFeedDetail'
    data = 'functionId=promote_getFeedDetail&client=m&clientVersion=-1&appid=signed_wh5&body={"taskId":"%s"}' % taskId
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        productInfoVos = res.get('data').get(
            'result').get('taskVos')[0].get('browseShopVo')
        return productInfoVos
    except Exception as e:
        print(e)

# 任务奖励
def getBadgeWard(awardToken, headers):
    url = 'https://api.m.jd.com/client.action?functionId=promote_getBadgeAward'
    data = 'functionId=promote_getFeedDetail&client=m&clientVersion=-1&appid=signed_wh5&body={"awardToken":"%s"}' % awardToken
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        myAwardVo = res.get('data').get('result').get('myAwardVos')[0]
        return myAwardVo
    except Exception as e:
        print(e)


# 任务列表


def task_list(headers, data):
    global inviteId_temp_list
    url = "https://api.m.jd.com/client.action?functionId=promote_getTaskDetail"
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        if res.get('code') == 0:
            taskVos = res.get('data').get('result')
            inviteId = taskVos.get("inviteId")
            if inviteId is not None and inviteId not in inviteId_temp_list:
                inviteId_temp_list.append(inviteId)
                print(f'账号：{get_user_name(headers)}，助力码：{inviteId}')
            return taskVos
        else:
            print(res.get('msg'))
    except Exception as e:
        print(e)


def vxtask_list(headers, data):
    try:
        taskVos = task_list(headers, data).get('taskVos')
        lists = []
        for i in taskVos:
            taskId = i.get('taskId')
            status = i.get('status')
            taskTitle = i.get('taskName')
            if status == 1:
                waitDuration = i.get('waitDuration')
                shoppingActivityVos = i.get('shoppingActivityVos', '')
                browseShopVos = i.get('browseShopVo', '')
                followShopVos = i.get('followShopVo', '')
                simpleRecordInfoVos = i.get('simpleRecordInfoVo', '')
                # shoppingActivityVos 需领取
                if taskId in [6, 8, 9, 12, 33, 34, 35, 36, 67]:  #
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    for shop in shoppingActivityVos:
                        shopstatus = shop.get('status')
                        taskToken = shop.get('taskToken')
                        shoptitle = shop.get('title')
                        itemId = shop.get('itemId')
                        if shopstatus == 1:
                            print('任务“%s”' % shoptitle)
                            guangdian(taskId, taskToken, itemId, headers,1)
                            print('等待%s秒' % (waitDuration + sleep_times))
                            time.sleep(int(waitDuration + sleep_times))
                            lingqu(taskToken, headers)
                # shoppingActivityVos 无需领取
                if taskId in [2, 7, 10, 11, 13, 30, 32, 37, 38, 39, 64, 65]:
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    for shop in shoppingActivityVos:
                        shopstatus = shop.get('status')
                        taskToken = shop.get('taskToken')
                        shoptitle = shop.get('title')
                        itemId = shop.get('itemId')
                        if shopstatus == 1:
                            print('任务“%s”' % shoptitle)
                            guangdian(taskId, taskToken, itemId, headers,1)
                            print('等待%s秒' % (waitDuration + sleep_times))
                            time.sleep(int(waitDuration + sleep_times))
                if taskId in [3]:
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    for browseShop in browseShopVos:
                        browsestatus = browseShop.get('status')
                        browsetaskToken = browseShop.get('taskToken')
                        shopName = browseShop.get('shopName')
                        shopId = browseShop.get('shopId')
                        if browsestatus == 1:
                            print('任务“%s”' % shopName)
                            guangdian(taskId, browsetaskToken, shopId, headers,1)
                            print('等待%s秒' % (waitDuration + sleep_times))
                            time.sleep(int(waitDuration + sleep_times))
                            lingqu(browsetaskToken, headers)
                # 加购
                if taskId in [16, 17, 18, 19, 20, 21, 22, 23]:
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    productInfoVos = getFeedDetail(taskId, headers)
                    for productInfoVo in productInfoVos:
                        itemId = productInfoVo.get('itemId')
                        taskToken = productInfoVo.get('taskToken')
                        skuName = productInfoVo.get('skuName')
                        status = productInfoVo.get('status')
                        if status == 1:
                            print('开始加购“%s”' % skuName)
                            ress = guangdian(
                                taskId, taskToken, itemId, headers,1)
                            times = ress.get('data').get('result').get('times')
                            if times == 4:
                                break
                            print('等待%s秒' % sleep_times)
                            time.sleep(sleep_times)
                if taskId in [4]:
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    browseShopVos = getFeedDetail1(taskId, headers)
                    for browseShopVo in browseShopVos:
                        itemId = browseShopVo.get('itemId')
                        taskToken = browseShopVo.get('taskToken')
                        status = browseShopVo.get('status')
                        shopName = browseShopVo.get('shopName')
                        if status == 1:
                            print('开始逛“%s”' % shopName)
                            ress = guangdian(
                                taskId, taskToken, itemId, headers,1)
                            times = ress.get('data').get('result').get('times')
                            if times == 5:
                                break
                            print('等待%s秒' % sleep_times)
                            time.sleep(sleep_times)
                if taskId in [28, 61]:
                    print(f'>>>>>>[{get_user_name(headers)}]开始进行{taskTitle}任务')
                    taskToken = simpleRecordInfoVos.get('taskToken')
                    itemId = simpleRecordInfoVos.get('itemId')
                    guangdian(taskId, taskToken, itemId, headers,1)
                    print('等待%s秒' % (waitDuration + sleep_times))
                    time.sleep(int(waitDuration + sleep_times))
                    guangdian(taskId, taskToken, itemId, headers,'')
                if taskId == 5:
                    taskToken = i.get('simpleRecordInfoVo').get('taskToken')
                    ii = 0
                    while ii <= 4:
                        ress = guangdian(5, taskToken, '', headers,1)
                        ii += 1
                        time.sleep(sleep_times)

            if status == 2:
                print(taskTitle + '任务已完成')
        lotteryTaskVos = task_list(headers, data).get('lotteryTaskVos')
        if lotteryTaskVos is None:
            return
        badge_task_list = lotteryTaskVos[0].get("badgeAwardVos")
        for task in badge_task_list:
            if task.get('status') != 3:
                continue
            awardVo = getBadgeWard(task.get("awardToken"), headers)
            print(f"完成获取任务次数奖励：{awardVo.get('pointVo').get('score')}")
            print('等待%s秒' % (sleep_times))
    except Exception as e:
        print(e)

# 助力


def jd_zhuli(inviteId, headers):
    ss = get_ss()
    url = 'https://api.m.jd.com/client.action?functionId=promote_collectScore'
    body = {
        "actionType": 0,
        "inviteId": "%s" % inviteId,
        "random": ss[0],
        "log": ss[1]
    }
    bodys = json.dumps(body)
    data = 'functionId=promote_collectScore&client=m&clientVersion=-1&appid=signed_wh5&body=%s' % bodys
    try:
        res = requests.post(url, headers=headers, data=data,
                            verify=False, timeout=5).json()
        if res.get('data').get('bizCode') == 0:
            print('助力成功')
            return res
        else:
            print(res.get('data').get('bizMsg'))
    except:
        print('其他')

def raise_level(headers):
    pass


inviteIds = ['ZXASTT0225KkcRx4QplfTKUz1l6UPdQFjRWnqq7zB55awQ', 'ZXASTT012_bkiAkRItguJFjRWnqq7zB55awQ', 'ZXASTT01597g7GU9KrQGJYUMFjRWnqq7zB55awQ', 'ZXASTT0146Lh2RRwZrw2JdwFjRWnqq7zB55awQ']
inviteId_temp_list = []
#print('软件放了作者的助力，不想助力的直接输入n 回车即可\n')
#print('是否愿意为作者助力：y/n')
content = 'y'

for Cookie in Cookies:
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'jdapp;iPhone;15.4.1;;;M/5.0;appBuild/168341;Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Origin': 'https://h5.m.jd.com/',
        'Referer': 'https://h5.m.jd.com/',
        'Cookie': Cookie
    }
    joyToken = get_joytoken(headers)
    Cookie = Cookie + ';joyytoken=50168' + joyToken
    headers['Cookie'] = Cookie
    i = 0
    while i < task_times:
        # 京东app任务
        jddata = 'functionId=promote_getTaskDetail&client=m&clientVersion=-1&appid=signed_wh5&body={"appSign":"3"}'
        vxtask_list(headers, jddata)
        # 微信任务
        wxdata = 'functionId=promote_getTaskDetail&client=m&clientVersion=-1&appid=signed_wh5&body={"appSign":"2"}'
        vxtask_list(headers, wxdata)
        # 升级转盘
        raise_level(headers)
        i += 1
    if content != 'n':
        for inviteId in inviteIds:
            jd_zhuli(inviteId, headers)
            time.sleep(sleep_times * 2)

print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(time.time()))))
