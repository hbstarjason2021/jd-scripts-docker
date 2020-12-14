#!/bin/bash

#docker-compose up --build --force-recreate --detach jd1
docker-compose up --no-build --force-recreate --detach jd1

##京豆变动通知jd_bean_change.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

##京东抽奖机jd_lotteryMachine.js  【东东抽奖机】、【新店福利】、【东东福利屋】、【东东生活】、【闪购盲盒】
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lotteryMachine.js'

##京东排行榜jd_rankingList.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_rankingList.js'

##京小超jd_superMarket.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket.js'

##京小超兑换奖品jd_blueCoin.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_blueCoin.js'

##京东金融养猪猪jd_pigPet.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pigPet.js'

## 东东小窝jd_small_home.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_small_home.js'

## 东东工厂jd_jdfactory.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdfactory.js'


##jd_bean_home.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_home.js'

## 京东汽车jd_car.js 
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_car.js'

## 健康抽奖机jd_health.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_health.js'

##jd_kd.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_kd.js'

##jd_split.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_split.js'

## 5折数码加购jd_digital_floor.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_digital_floor.js'

## 直播红包雨jd_live_redrain.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live_redrain.js'

## 金融打卡jr_sign.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jr_sign.js'

## 京喜金牌厂长jd_jxstory.js
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxstory.js'

##取关京东店铺和商品jd_unsubscribe.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'

