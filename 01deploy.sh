#!/bin/bash

sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

docker-compose version

git clone https://github.com/hbstarjason/jd-scripts-docker && cd jd-scripts-docker


docker-compose up --build --force-recreate --detach jd1

##京豆变动通知jd_bean_change.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

##取关京东店铺和商品jd_unsubscribe.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_unsubscribe.js'

##京东抽奖机jd_lotteryMachine.js  【东东抽奖机】、【新店福利】、【东东福利屋】、【东东生活】、【闪购盲盒】
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_lotteryMachine.js'

##点点券jd_necklace.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_necklace.js'

##京东排行榜jd_rankingList.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_rankingList.js'

##京小超jd_superMarket.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket.js'

##京小超兑换奖品jd_blueCoin.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_blueCoin.js'

##京东金融养猪猪jd_pigPet.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pigPet.js'


# 各种签到jd_bean_sign.js
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_sign.js'



