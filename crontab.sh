### crontab -l

### crontab -e


28 */2 * * *  sh /home/ubuntu/jd-scripts-docker/00run.sh > /home/ubuntu/jd_cron.log 2>&1

8 20 * * * sh /home/ubuntu/jd-scripts-docker/01run.sh > /home/ubuntu/jd1.log 2>&1
38 20 * * * sh /home/ubuntu/jd-scripts-docker/02run.sh > /home/ubuntu/jd2.log 2>&1
8 21 * * * sh /home/ubuntu/jd-scripts-docker/04run.sh > /home/ubuntu/jd4.log 2>&1
38 21 * * * sh /home/ubuntu/jd-scripts-docker/03run.sh > /home/ubuntu/jd3.log 2>&1

8 1 * * * sh /home/ubuntu/03update_jxmc.sh > /home/ubuntu/03update_jxmc.log 2>&1
8 2 * * * sh /home/ubuntu/02update_cfd.sh > /home/ubuntu/02update_cfd.log 2>&1


### ls /var/spool/cron/crontabs/
### /var/spool/cron/ 目录下存放的是每个用户包括root的crontab任务，每个任务以创建者的名字命名。
### /etc/crontab 这个文件负责调度各种管理和维护任务。
### /etc/cron.d/ 这个目录用来存放任何要执行的crontab文件或脚本。

### 可以把脚本放在/etc/cron.hourly、/etc/cron.daily、/etc/cron.weekly、/etc/cron.monthly目录中，让它每小时/天/星期、月执行一次。

### Ctrl + O 写入内容， 出现File name to Write ...，输入Enter
### Ctrl +X 保存并输出，保存完成


###### systemctl is-enabled crond.service
###### systemctl enable crond.service
###### systemctl status crond.service

###### cat /etc/crontab
######  cat /var/spool/cron/root

###### tail -f -n 10 /var/log/cron
###### ls -l /var/spool/cron
