#!/bin/bash

#docker-compose up --build --force-recreate --detach jd1
docker-compose up --no-build --force-recreate --detach jd1

##京豆变动通知jd_bean_change.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

## 东东小窝jd_small_home.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_small_home.js'

## 东东工厂jd_jdfactory.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdfactory.js'

##jd_bean_home.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_home.js'

## jd_club_lottery.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_club_lottery.js'

## 京东汽车jd_car.js 
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_car.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_car_exchange.js'

###### 京东到家
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /jddj; node jddj_bean.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /jddj; node jddj_plantBeans.js'

## 京东快递jd_kd.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_kd.js'

## 十元街jd_syj.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_syj.js'

##京小超jd_superMarket.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket.js'

# 幸运大转盘
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_market_lottery.js'

##京小超兑换奖品jd_blueCoin.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_blueCoin.js'

##京东抽奖机jd_lotteryMachine.js  【东东抽奖机】、【新店福利】、【东东福利屋】、【东东生活】、【闪购盲盒】
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lotteryMachine.js'

##京东排行榜jd_rankingList.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_rankingList.js'

## 锦鲤红包 jd_redPacket.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_redPacket.js'

# 京东极速版-领红包
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_redpocke.js'

## 直播
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'

## 领现金
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cash.js'

## 领金贴
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jin_tie.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jintie_wx.js'

## 京喜消消乐
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_cash_sign.js'

## 京东赚赚 jd_jdzz.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdzz.js'

## 小魔方
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xmf.js'

## 每日抽奖
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_daily_lottery.js'

## 金榜创造营
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gold_creator.js'

## 京喜农场 jd_jxnc.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxnc.js'

## 京喜财富岛1
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node  jd_jxcfd.js'
## 美丽研究院1
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty.js'

## 宠汪汪偷好友积分与狗粮
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joy_steal.js'

## 东东萌宠jd_pet.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pet.js'

## 京喜工厂
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_dreamFactory.js'

###### 种豆得豆
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js'

## 女装盲盒
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nzmh.js'

## 口袋书店 jd_bookshop.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bookshop.js'

##京东金融养猪猪jd_pigPet.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pigPet.js'

## 京喜财富岛2
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_cfd.js'
## 美丽研究院2
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mlyjy.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cfd.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxnc.js'

#### 各种签到
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_sign.js'

## 粉丝互动
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fanslove.js'

## 店铺加购有礼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node monk_shop_add_to_car.js'

##取关京东店铺和商品jd_unsubscribe.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'

## 删除优惠券
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'



## 京小兑
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxd.js'

## 百变大咖秀
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_entertainment.js'

## 京东国际
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_global.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_global_mh.js'

#城城领现金
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_city.js'

## jd_crazy_joy.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_crazy_joy.js'
# docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_crazy_joy_coin.js'


## 炸年兽
# docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nianCollect.js'
# docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nian_wechat.js'

## 健康抽奖机jd_health.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_health.js'

## 小鸽有礼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xg.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xgyl.js'

## 京东健康APP集汪汪卡jd_jdh.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdh.js'

## 金融打卡jr_sign.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jr_sign.js'

## 看一看jd_watch.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_watch.js'

##jd_split.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_split.js'

## 5折数码加购jd_digital_floor.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_digital_floor.js'

## 直播红包雨jd_live_redrain.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live_redrain.js'

## 京喜金牌厂长
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxstory.js'

