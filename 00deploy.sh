## http://rancher-mirror.cnrancher.com/docker-compose/v1.27.4/docker-compose-Linux-x86_64
## https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)

sudo curl -L "http://rancher-mirror.cnrancher.com/docker-compose/v1.27.4/docker-compose-$(uname -s)-$(uname -m)"  \
   -o /usr/local/bin/docker-compose  && \
   sudo chmod +x /usr/local/bin/docker-compose &&  docker-compose version && \
    git clone https://github.com/hbstarjason/jd-scripts-docker/ && \
   cd jd-scripts-docker && ls -l  && \
 docker pull hbstarjason/jd-scripts

docker-compose up --no-build --force-recreate --detach jd1
docker-compose up --no-build --force-recreate --detach jd2
docker-compose up --no-build --force-recreate --detach jd4

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_crazy_joy_coin.js'

docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_bean_change.js'


cp 01run.sh 02run.sh &&  sed -i "s/jd1/jd2/g"  02run.sh 
cp 01run.sh 04run.sh &&  sed -i "s/jd1/jd4/g"  04run.sh

sed -i '2s/pt_key=/XXXX/' env/env1 && \
  sed -i '3s/pt_pin=/pt_pin=jd_709c349f13b51/' env/env1
