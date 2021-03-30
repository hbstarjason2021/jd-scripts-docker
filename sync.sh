#!/bin/bash
trap 'cp /jd-scripts-docker/sync.sh /sync' Exit
(
  exec 2<>/dev/null
  set -e
  cd /jd-scripts-docker
  git pull
) || {
  git clone --branch=main https://github.com/hbstarjason/jd-scripts-docker.git /jd-scripts-docker_tmp
  [ -d /jd-scripts-docker_tmp ] && {
    rm -rf /jd-scripts-docker
    mv /jd-scripts-docker_tmp /jd-scripts-docker
  }
}

#######
(
  exec 2<>/dev/null
  set -e
  cd /scripts
  git pull
) || {
  #git clone --branch=master https://gitee.com/lxk0301/jd_scripts.git /scripts_tmp
  #git clone --branch=main https://github.com/hbstarjason/jd-scripts.git /scripts_tmp
  #git clone --branch=master https://github.com/hbstarjason/jd_scripts.git /scripts_tmp
  #git clone --branch=master https://github.com/hbstarjason/a.git /scripts_tmp
  git clone --branch=jd_scripts https://github.com/hbstarjason/jd_scripts.git /scripts_tmp
  
  [ -d /scripts_tmp ] && {
    rm -rf /scripts
    mv /scripts_tmp /scripts
  }
}

#######
(
  exec 2<>/dev/null
  set -e
  cd /qx
  git pull
) || {
  #git clone --branch=main https://github.com/i-chenzhe/qx.git /qx_tmp
  git clone --branch=qx https://github.com/hbstarjason/jd_scripts.git /qx_tmp
  
  [ -d /qx_tmp ] && {
    rm -rf /qx
    mv /qx_tmp /qx
  }
}

########
(
  exec 2<>/dev/null
  set -e
  cd /Loon
  git pull
) || {
  #git clone --branch=main https://github.com/shylocks/Loon.git /Loon_tmp
  git clone --branch=main https://github.com/chinnkarahoi/Loon.git /Loon_tmp
  [ -d /Loon_tmp ] && {
    rm -rf /Loon
    mv /Loon_tmp /Loon
  }
}

#######
(
  exec 2<>/dev/null
  set -e
  cd /scripts-bak
  git pull
) || {
  git clone --branch=master https://gitlab.com/MrRight/Scripts.git /scripts-bak_tmp
  [ -d /scripts-bak_tmp ] && {
    rm -rf /scripts-bak
    mv /scripts-bak_tmp /scripts-bak
  }
}

cd /scripts || exit 1
npm install || npm install --registry=https://registry.npm.taobao.org || exit 1

[ -f /crontab.list ] && {
  cp /crontab.list /crontab.list.old
}
cat /etc/os-release | grep -q ubuntu && {
  cp /jd-scripts-docker/crontab.list /crontab.list
  crontab -r
} || {
  cat /scripts/docker/crontab_list.sh | grep 'node' | sed 's/>>.*$//' | awk '
  BEGIN{
    print("55 */3 * * *  bash /jd-scripts-docker/cron_wrapper bash /sync")
  }
  {
    for(i=1;i<=5;i++)printf("%s ",$i);
    printf("bash /jd-scripts-docker/cron_wrapper \"");
    for(i=6;i<=NF;i++)printf(" %s", $i);
    print "\"";
  }
  ' > /crontab.list
}

cp /crontab.list /crontab.list.old
cp /jd-scripts-docker/crontab.list /crontab.list
cp /jd-scripts-docker/from/jx_cfd.js /scripts/jx_cfd.js
cp /jd-scripts-docker/from/jx_cfd_exchange.js /scripts/jx_cfd_exchange.js
cp /jd-scripts-docker/from/jx_cfdtx.js /scripts/jx_cfdtx.js
cp /jd-scripts-docker/from/jdJxncTokens.js /scripts/jdJxncTokens.js

cp /jd-scripts-docker/from/jd_daydlt.js /scripts/jd_daydlt.js
cp /jd-scripts-docker/from/jdautogan.js /scripts/jdautogan.js


##cp /jd-scripts-docker/from/jd_entertainment.js /scripts/jd_entertainment.js
cp /qx/jd_entertainment.js /scripts/jd_entertainment.js && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/jd_entertainment.js
##cp /jd-scripts-docker/from/jd_fanslove.js /scripts/jd_fanslove.js
cp /qx/jd_fanslove.js /scripts/jd_fanslove.js && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/jd_fanslove.js
##cp /jd-scripts-docker/from/z_wish.js  /scripts/z_wish.js 
cp /qx/z_wish.js  /scripts/z_wish.js && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/z_wish.js

cp /qx/z_lenovo.js     /scripts/z_lenovo.js    && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/z_lenovo.js
cp /qx/z_mgold.js      /scripts/z_mgold.js     && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/z_mgold.js
cp /qx/z_super5g.js    /scripts/z_super5g.js   && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/z_super5g.js
cp /qx/z_city_cash.js  /scripts/z_city_cash.js && sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/z_city_cash.js

cp /jd-scripts-docker/from/jd_mlyjy.js /scripts/jd_mlyjy.js
cp /jd-scripts-docker/from/jd_xmf.js /scripts/jd_xmf.js

cp /scripts-bak/jd_jxcfd.js /scripts/jd_jxcfd.js

#cp /jd-scripts-docker/jd_ms.js  /scripts
#cp /jd-scripts-docker/jd_vote.js  /scripts

#cp /jd-scripts-docker/USER_AGENTS.js /Loon
#cp /jd-scripts-docker/jdCookie.js /Loon

#cd /Loon && npm install -g

crontab -r

crontab /crontab.list || {
  cp /crontab.list.old /crontab.list
  crontab /crontab.list
}
crontab -l
