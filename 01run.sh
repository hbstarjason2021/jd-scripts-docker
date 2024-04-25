#!/bin/bash

#docker-compose up --build --force-recreate --detach jd1
docker-compose up --no-build --force-recreate --detach jd1

##京豆变动通知jd_bean_change.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

## 购物抵现金20豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gwxj.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gwxj_v.js'

## 京豆国际
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ddgj.js'

## jd_ttlhb.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ttlhb.js'

## jd_jdgj_sign.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdgj_sign.js'

## jd_beanSign.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beanSign.js'

## 京东快递
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdkd.js'

## 天天来赚钱
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_wxttzq.js'

## 积分换话费
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_dwapp.js'



## 健康社区兑换
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_health-new.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_health-new2.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_health_exchange.js'

### 东东农场
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ddnc_farmpark.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fruit_moreTask.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fruit_friend.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fruit_hw.js'

###### 种豆得豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean-new.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node  jd_plantBean-6dy.js'

## 玩一玩
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_wyw.js'

## 摇钱树
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_yqs.js'

## 极速版赚金币
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_sign_new.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_coin.js'

##取关京东店铺和商品jd_unsubscribe.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'
#清空购物车
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cleancart.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; JD_CART_REMOVE=true ; node jd_cleancart_nolan.js'


#################################################################################################################################################

## 领现金
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cash-new.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cash-new2.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cash_Mod.js'


## 京东农场好友
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fruit_friend.js'

## 删除优惠券
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'

## 许愿池
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xyc.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_wish.js'

## 店铺加购有礼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node monk_shop_add_to_car.js'

## 货种草集市
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nhjs.js'

## 直播
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'

## 京东赚赚 jd_jdzz.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdzz.js'

##过期京豆兑换为喜豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; exjxbeans=true; node jd_exchangejxbeans.js'

## 集魔方
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jmf.js'

## 宝藏榜
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_TreasureRank.js'

## 金榜
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gold_sign.js'

## 金榜创造营
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gold_creator.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gold_creator-new.js'

## 京东汽车jd_car.js 
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_car.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_car_exchange.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mpdzcar.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mpdzcar_game.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mpdzcar_help.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; car_addsku=true ; node jd_mpdz-car.js'

# 京东极速版-领红包
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_redpocke.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_redpocke-new.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_SpeedUp.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_signred.js'

##极速版-汪汪乐园
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joy_park_task.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joypark_tx.js'

## 京东超市超新星计划-签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdsupermarket_sign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_supermarket_sign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_supermarket.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_supermarket_ex.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_supermarket_exchange.js'

##jd_bean_home.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_home.js'

## 领京豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node gua_MMdou.js'
## 点点券
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_necklace_6dy.js'

## 击鼓迎春抽红包
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_welcomechun.js'

## 日常签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_dailysign.js'

## 秒杀币
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ms-new.js'

## 东东萌宠jd_pet.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pet.js'

## 新百货大楼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xbhdl.js'

###### 京东到家
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /jddj; node jddj_bean.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /jddj; node jddj_plantBeans.js'

## 专属礼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jingBeanReceive.js'

## 微信签到领红包
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cash_wx.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_wq_wxsign.js'

## 京东-京喜双签
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jx_sign.js'

## 京喜签到-喜豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_sign_xd.js'

#取关所有主播
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscriLive.js '

## 京喜签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxqd.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_sign.js'

## 京喜财富岛1
## docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node  jd_jxcfd.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cfd_new.js'
## 美丽研究院1
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty-new.js'

# docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node gua_wealth_island_help.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_cfd.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxnc-new.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_SpeedUp.js'

## 美丽研究院兑换
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty_ex.js'

## 京东极速版签到
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_js_sign.js'

## 京东金融-积分
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdjrjf.js'

## 闪购盲盒
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_sgmh.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_shangou.js'

## 领金贴
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jin_tie.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jintie.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jintie_wx.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jin_tie_xh.js'

## 京享周周乐
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xs_zzl.js'

## jd_club_lottery.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_club_lottery.js'

### 特务签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superBrandSign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_productZ4Brand.js'

### 特务Z预约
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mx_tewuz_booking.js'

## 东东工厂jd_jdfactory.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdfactory.js'

###### 各种签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_sign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_sign_graphics.js'

## 女装盲盒
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nzmh-new.js'

##京东金融养猪猪jd_pigPet.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pigPet.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pigPet-new.js'

## 京喜工厂
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_dreamFactory.js'

## 探味奇遇记
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_tanwei.js'

##京小超jd_superMarket.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket-new.js'
##京小超-第2次jd_superMarket.js 
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket-new.js'

### 内容鉴赏
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_connoisseur.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node gua_UnknownTask3.js'

## jd_ry.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ry.js'

## 芥么
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jmsign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_genz.js'

## 每日抽奖-小鸽有礼
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_daily_lottery.js'

## 牛牛福利
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_nnfls.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_nnfls-new.js'

#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_nh_sign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bt_sign.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_babel_sign.js'

## 粉丝互动
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fanslove.js'

## 小魔方
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mf.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mf-new.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mofang.js'

## 幸运大转盘
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_market_lottery.js'

## 美妆馆-选品官
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_selectionOfficer.js'

## 京东快递jd_kd.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_kd.js'

### 小米618
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xm618.js'

## 内容鉴赏官
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_connoisseur.js'

## 京东金融每周领取权益
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jr_draw.js'

## 秒杀币
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ms.js'

## 京东工业品抽奖
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_industryLottery.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_gyp.js'

## 京喜农场 jd_jxnc.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxnc-new.js'

## 京喜财富岛2
## docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_cfd.js'
## 美丽研究院2
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mlyjy.js'

## 宠汪汪偷好友积分与狗粮
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joy_steal-new.js'

## 京享值PK
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node ddo_pk-new.js'

## 十元街jd_syj.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_syj-new.js'

## 锦鲤红包 jd_redPacket.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_redPacket-new.js'

## 京喜消消乐
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_cash_sign.js'

##京小超兑换奖品jd_blueCoin.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_blueCoin.js'

## 美丽种植园
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty_plantation.js'

## 零食街
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lsj.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; lsjdh="jdAward2"; node jd_lsj-new.js'

## 京东生鲜
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_sxLottery.js'

### 东东电竞经理
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node zooElecsport.js'

### 东东世界
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ddworld-new.js'

## 口袋书店 jd_bookshop.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bookshop.js'

## 东东农场集勋章
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_medal.js'

## 3.8女神节签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_38qd.js'

## 天天压岁钱
##docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ttysq.js'

## 萌虎摇摇乐
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_tiger.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mhyyl.js'

## 京东金融-天天拼图
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ttpt.js'

## 理想家
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lxLottery.js'

## 东东小窝jd_small_home.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_small_home.js'

##京东抽奖机jd_lotteryMachine.js  【东东抽奖机】、【新店福利】、【东东福利屋】、【东东生活】、【闪购盲盒】
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lotteryMachine.js'
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lotteryMachine-new.js'

## 京车会签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jchsign.js'

## 写情书抽京豆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xqscjd.js'

## 答题
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_dt.js'

## 点点券
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_necklace_new2.js'

## 小家福利社签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_flsSign.js'

## 小家电签到
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_xjdSign.js'

## 一加手机
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_yijia.js'

## 潮玩儿制躁团
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_zzt.js'

##京东排行榜jd_rankingList.js
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_rankingList.js'

## 海尔
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_haier.js'

## 美妆周年庆
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_beauty_twelfth.js'

####### 七夕情报局
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node gua_doge.js'

## 金机馆投票
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_golden_machine.js'

## 来电好物季
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node zy_ldhwj.js'

## 荣耀焕新季
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node zy_ryhxj.js'

## 家电
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_appliances.js'

####### 寻找陆一八京奇探秘夜
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_qqtmy.js'

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

####### 新潮品牌狂欢
#docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mcxhd_brandcity.js'
