sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)"  \
   -o /usr/local/bin/docker-compose  && \
   sudo chmod +x /usr/local/bin/docker-compose &&  docker-compose version && \
    git clone https://github.com/hbstarjason/jd-scripts-docker/ && \
   cd jd-scripts-docker && ls -l  && \
 docker pull hbstarjason/jd-scripts


docker exec jd1 bash -c 'set -o allexport; source /all; source /env; source /jd-scripts-docker/resolve.sh; cd /scripts; node jd_crazy_joy_coin.js'
