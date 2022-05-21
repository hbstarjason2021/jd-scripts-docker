#!/bin/bash
trap 'cp /jd-scripts-docker/sync.sh /sync' Exit
(
  exec 2<>/dev/null
  set -e
  cd /jd-scripts-docker
  git pull
) || {
  git clone --branch=main https://github.com/hbstarjason2021/jd-scripts-docker.git /jd-scripts-docker_tmp
  ####git clone --branch=main https://${{ secrets.PAT }}@github.com/hbstarjason2021/jd-scripts-docker.git /jd-scripts-docker_tmp
  
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
  git clone --branch=jd_scripts-new https://github.com/hbstarjason2021/jd_scripts.git /scripts_tmp
  
  [ -d /scripts_tmp ] && {
    rm -rf /scripts
    mv /scripts_tmp /scripts
  }
}

#######
(
  exec 2<>/dev/null
  set -e
  cd /JDHelloWorld
  git pull
) || {
  git clone --branch=JDHelloWorld-jd_scripts https://github.com/hbstarjason2021/jd_scripts.git /JDHelloWorld 
  [ -d /JDHelloWorld_tmp ] && {
    rm -rf /JDHelloWorld
    mv /JDHelloWorld_tmp /JDHelloWorld
  }
}

########
#(
#  exec 2<>/dev/null
#  set -e
#  cd /Loon
#  git pull
#) || {
  #git clone --branch=main https://github.com/shylocks/Loon.git /Loon_tmp
#  git clone --branch=main https://github.com/chinnkarahoi/Loon.git /Loon_tmp
#  [ -d /Loon_tmp ] && {
#    rm -rf /Loon
#    mv /Loon_tmp /Loon
#  }
#}

#######
#(
#  exec 2<>/dev/null
#  set -e
#  cd /ljqailym
#  git pull
#) || {
#  git clone --branch=ljqailym https://github.com/hbstarjason2021/jd_scripts.git /ljqailym_tmp
#  [ -d /ljqailym_tmp ] && {
#    rm -rf /ljqailym
#    mv /ljqailym_tmp /ljqailym
#  }
#}

#######
(
  exec 2<>/dev/null
  set -e
  cd /jddj
  git pull
) || {
  git clone --branch=jddj-new https://github.com/hbstarjason2021/jd_scripts.git /jddj_tmp
  [ -d /jddj_tmp ] && {
    rm -rf /jddj
    mv /jddj_tmp /jddj
  }
}

#######

cd /JDHelloWorld || exit 1
npm install  || npm install --registry=https://registry.npm.taobao.org || exit 1
npm install -g typescript ts-node
npm cache clean --force

cd /scripts || exit 1
npm install -g || npm install --registry=https://registry.npm.taobao.org || exit 1
npm cache clean --force

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

## cp /jd-scripts-docker/jdCookie.js  /JDHelloWorld/jdCookie.js
## sed -i '10,11d' jdCookie.js
#cp /jd-scripts-docker/from/TS_USER_AGENTS.ts  /JDHelloWorld/TS_USER_AGENTS.ts
cp /jd-scripts-docker/from/TS_USER_AGENTS_new.ts  /JDHelloWorld/TS_USER_AGENTS.ts

cp /jd-scripts-docker/jdCookie.js  /scripts/jdCookie.js
cp /jd-scripts-docker/from/*  /scripts/
cp /jd-scripts-docker/utils/*  /scripts/utils/

#cp /ljqailym/jd_live_redrain_half.js /scripts/jd_live_redrain_half.js
#cp /ljqailym/redman_rain_hr.js       /scripts/redman_rain_hr.js 
#cp /ljqailym/redman_rain_hy.js       /scripts/redman_rain_hy.js 
#cp /ljqailym/redman_rain_mz.js       /scripts/redman_rain_mz.js
#cp /ljqailym/redman_rain_hyzb.js     /scripts/redman_rain_hyzb.js
#cp /ljqailym/redman_rain_x9b.js      /scripts/redman_rain_x9b.js

npm install png-js  date-fns axios dotenv ts-md5 jsdom moment ws && npm cache clean --force
cd /jddj && npm install request && npm cache clean --force

##################################
sed -i 's/helpAuthor=true/helpAuthor=false/' /scripts/jd_jdzz.js
sed -i "s/eU9YL5XqGLxSmRSAkwxR@eU9YaO7jMvwh-W_VzyUX0Q@eU9YaurkY69zoj3UniVAgg@eU9YaOnjYK4j-GvWmXIWhA@eU9YMZ_gPpRurC-foglg@eU9Ya77gZK5z-TqHn3UWhQ@eU9Yaui2ZP4gpG-Gz3EThA@eU9YaeizbvQnpG_SznIS0w/S5KkcRx4QplfTKUz1l6UPdQ@S97g7GU9KrQGJYUM@S6Lh2RRwZrw2Jdw@S_bkiAkRItguJ/g" /scripts/jd_jdzz.js
sed -i "s/-4msulYas0O2JsRhE-2TA5XZmBQ@eU9Yar_mb_9z92_WmXNG0w@eU9YaO7jMvwh-W_VzyUX0Q@eU9YaurkY69zoj3UniVAgg@eU9YaOnjYK4j-GvWmXIWhA@eU9YaO23bvtyozuGyHsR1A/S5KkcRx4QplfTKUz1l6UPdQ@S97g7GU9KrQGJYUM@S6Lh2RRwZrw2Jdw@S_bkiAkRItguJ/g" /scripts/jd_jdzz.js

sed -i 's/helpAuthor = true/helpAuthor = false/' /scripts/jd_cash.js
sed -i "s/eU9YL5XqGLxSmRSAkwxR@eU9YaO7jMvwh-W_VzyUX0Q@eU9YaurkY69zoj3UniVAgg@eU9YaOnjYK4j-GvWmXIWhA@eU9YMZ_gPpRurC-foglg@eU9Ya77gZK5z-TqHn3UWhQ@eU9Yaui2ZP4gpG-Gz3EThA@eU9YaeizbvQnpG_SznIS0w/eU9Ya-y7Nf8i-DjUyCEW1w@al5_Nb3hPql4sDc@dV4yae6yPKV4pg@YF9mLrbjJaN4/g" /scripts/jd_cash.js
sed -i "s/-4msulYas0O2JsRhE-2TA5XZmBQ@eU9Yar_mb_9z92_WmXNG0w@eU9YaO7jMvwh-W_VzyUX0Q@eU9YaurkY69zoj3UniVAgg@eU9YaOnjYK4j-GvWmXIWhA@eU9YaO23bvtyozuGyHsR1A/eU9Ya-y7Nf8i-DjUyCEW1w@al5_Nb3hPql4sDc@dV4yae6yPKV4pg@YF9mLrbjJaN4/g" /scripts/jd_cash.js

sed -i "s/28a699ac78d74aa3b31f7103597f8927@2f14ee9c92954cf79829320dd482bf49@fdf827db272543d88dbb51a505c2e869@ce2536153a8742fb9e8754a9a7d361da@38ba4e7ba8074b78851e928af2b4f6b2/cada6cf13e48414d971a92bdba5375e8@5abc6697f1e34f8f8e14d7145a123a4c@ac3821ebe5ba4e69a097255fb57a6db6@1afd0390d67148e68e32808922be6c4f/g" /scripts/jd_bookshop.js
sed -i "s/28a699ac78d74aa3b31f7103597f8927@2f14ee9c92954cf79829320dd482bf49@fdf827db272543d88dbb51a505c2e869/cada6cf13e48414d971a92bdba5375e8@5abc6697f1e34f8f8e14d7145a123a4c@ac3821ebe5ba4e69a097255fb57a6db6@1afd0390d67148e68e32808922be6c4f/g" /scripts/jd_bookshop.js

sed -i 's/helpAu = true/helpAu = false/' /scripts/jd_dreamFactory.js
sed -i 's/helpAu = true/helpAu = false/' /scripts/jd_bean_home.js
sed -i 's/helpAu = true/helpAu = false/' /scripts/jd_superMarket.js

sed -i "s/T019-aknAFRllhyoQlyI46gCjVfnoaW5kRrbA@T0225KkcRhcbp1CBJhv0wfZedQCjVfnoaW5kRrbA@T010_aU6SR8Q_QCjVfnoaW5kRrbA@T0225KkcREtN9lOGJUinl_dfcwCjVfnoaW5kRrbA@T0225KkcRBYdoFaGIxOnnPMJdACjVfnoaW5kRrbA@T027Zm_olqSxIOtH97BATGmKoWraLawCjVfnoaW5kRrbA@T0225KkcRk1N_FeCJhv3xvdfcQCjVfnoaW5kRrbA/T0225KkcRx4QplfTKUz1l6UPdQCjVfnoaW5kRrbA@T01597g7GU9KrQGJYUMCjVfnoaW5kRrbA@T0146Lh2RRwZrw2JdwCjVfnoaW5kRrbA@T012_bkiAkRItguJCjVfnoaW5kRrbA/g" /scripts/jd_health.js

#sed -i "s/xBd-HlYMlLUzqSkuz0qzAzuayqOG3FfAIeOTGLowr29_KbnH2bV4EX4@RtGKzr_wSAn2eIKZRdRm07jvOMS2zVH-g8ri6aOIZPDcI8v7CA/RtGKz-ytEgmnd9WbFIY21wi0WAby6b7-_TwSjslwpiFLtlxJ2w@VcCtkb33GV_9P9rWW5gzmm8elPMfXOe8z_QdOEEwM3s@SsDgze6kG1P9Kc_WW9R_miwM1wjj9yFbflluWvGc7g@X8G0irb1AlX9Ms_WF5h_mqlwj7Qxo5h2OIxo45-u/g" /scripts/jd_city.js
###################################

crontab -r

crontab /crontab.list || {
  cp /crontab.list.old /crontab.list
  crontab /crontab.list
}
crontab -l
