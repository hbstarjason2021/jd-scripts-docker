#!/bin/bash

#docker-compose up --build --force-recreate --detach jd3
docker-compose up --no-build --force-recreate --detach jd3

##京豆变动通知jd_bean_change.js
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

##芥么
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jmsign.js'
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_genz.js'

##极速版特价翻翻乐
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jdtj_winner.js'

##汪汪乐园
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joy_park_task.js'
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_joypark_tx.js'

##东东农场
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fruit.js'

##种豆得豆
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js'

##东东萌宠
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_pet.js'

##闪购盲盒
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_sgmh.js'

##财富岛助力
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node gua_wealth_island_help.js'

##内容鉴赏
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_connoisseur.js'

##东东世界
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_ddworld-new.js'

##牛牛福利社
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jx_nnfls-new.js'

##许愿池
docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_wish.js'

#docker-compose down
docker stop jd3 && docker rm jd3


##集卡
##docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jika.js'
##东东小窝
##docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_small_home-new.js'
