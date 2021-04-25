## http://rancher-mirror.cnrancher.com/docker-compose/v1.27.4/docker-compose-Linux-x86_64
## https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)

sudo curl -L "http://rancher-mirror.cnrancher.com/docker-compose/v1.27.4/docker-compose-$(uname -s)-$(uname -m)"  \
   -o /usr/local/bin/docker-compose  && \
   sudo chmod +x /usr/local/bin/docker-compose &&  docker-compose version && \
    git clone https://gitee.com/starjason/jd-scripts-docker/ && \
   cd jd-scripts-docker && ls -l  && \
 docker pull hbstarjason/jd-scripts
 
 #git clone https://github.com/hbstarjason/jd-scripts-docker
 #docker pull hbstarjason/jd-scripts:f5770e9adb7b52acb000dcdc3c116d687bf31dd4

docker-compose up --no-build --force-recreate --detach jd1
docker-compose up --no-build --force-recreate --detach jd2
docker-compose up --no-build --force-recreate --detach jd3
docker-compose up --no-build --force-recreate --detach jd4

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_crazy_joy_coin.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_speed_sign.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jdautogan.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js' && \
 docker exec jd2 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js' && \
 docker exec jd3 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js' && \
 docker exec jd4 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_plantBean.js'
 
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_superMarket.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_fanslove.js' 
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_carnivalcity.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node monk_inter_shop_sign.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node monk_shop_follow_sku.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node monk_shop_lottery.js'


docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_jxd.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_live_redrain.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_global.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_global_mh.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_mohe.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node z_wish.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node z_lenovo.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node z_mgold.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node z_super5g.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node z_city_cash.js'


cp 01run.sh 02run.sh &&  sed -i "s/jd1/jd2/g"  02run.sh
cp 01run.sh 03run.sh &&  sed -i "s/jd1/jd3/g"  03run.sh 
cp 01run.sh 04run.sh &&  sed -i "s/jd1/jd4/g"  04run.sh

sed -i '2s/pt_key=/XXXX/' env/env1 && \
  sed -i '3s/pt_pin=/pt_pin=jd_709c349f13b51/' env/env1
  
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node getJDCookie.js'
docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_get_share_code.js'
