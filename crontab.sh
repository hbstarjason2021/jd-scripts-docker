### crontab -l

### crontab -e


28 */2 * * *  sh /home/ubuntu/jd-scripts-docker/00run.sh > /home/ubuntu/jd_cron.log 2>&1

8 20 * * * sh /home/ubuntu/jd-scripts-docker/01run.sh > /home/ubuntu/jd1.log 2>&1
38 20 * * * sh /home/ubuntu/jd-scripts-docker/02run.sh > /home/ubuntu/jd2.log 2>&1
8 21 * * * sh /home/ubuntu/jd-scripts-docker/04run.sh > /home/ubuntu/jd4.log 2>&1
38 21 * * * sh /home/ubuntu/jd-scripts-docker/03run.sh > /home/ubuntu/jd3.log 2>&1

8 1 * * * sh /home/ubuntu/03update_jxmc.sh > /home/ubuntu/03update_jxmc.log 2>&1
8 2 * * * sh /home/ubuntu/02update_cfd.sh > /home/ubuntu/02update_cfd.log 2>&1


### Ctrl + O 写入内容， 出现File name to Write ...，输入Enter
### Ctrl +X 保存并输出，保存完成
