/*
  支付宝<10月摇一摇>
  author：嘉佳
*/
auto.waitFor();//无障碍服务检测
console.show();//开启悬浮窗
console.info("支付宝<10月摇一摇>任务");
setClip("wrim8WN55hk");//邀请码
sleep(1000);
console.log("即将启动<支付宝>"); 
app.launchApp("支付宝");//打开支付宝 //如果在分身应用中无法跳转，可屏蔽此行
var RewardTimes=0//金币奖励次数
var NullRewardTimes=0//无奖励摇红包次数
var ShakeHongBaoTimes=0//摇红包次数
while (text("摇红包").findOnce() == null) {
  console.info("未找到活动界面，请手动进入");
  sleep(3000);
}
if (text("摇红包").findOne() == null) {
  console.info("正在根据助力码进入活动页面");
  sleep(1000);
  if(text("去看看").findOne() == null){
    console.log("等待APP识别助力码");
    var t = 0;
    while(t < 5 | text("去看看").findOne() == null){
      if(text("去看看").exists()){
        break;
      }
      sleep(1000);
      console.log(t+1);
      t++;
      if(t > 5){
        console.error("超时未检测到新助力码，请手动进入活动界面");
        sleep(1000);
        break;
      }
    }
  }
  while(text("去看看").exists() |text("关闭").exists()){
    if (text("去看看").exists()){
      sleep(2000);
      console.log("去看看");
      text("去看看").findOne().click();
      text("关闭").waitFor();
      console.log("关闭");
      text("关闭").findOne().click();
      sleep(1000);
      break;
    } else if(text("关闭").exists()){
      sleep(2000);
      console.log("关闭");
      text("关闭").findOne().click();
    } else{
      console.log("助力完成");
      break;
    }
    sleep(2000);
  }
  while (text("摇红包").findOne() == null) {
    console.info("未找到活动界面，请手动进入");
    sleep(3000);
  }
}
if (text("摇红包").exists()) {
  console.info("成功进入活动界面");
  console.log("等待加载弹窗……");
  sleep(500);
  for(var i = 0; i < 3; i++){//等待5秒，如有弹窗，提前进入下一步
    if(text("关闭").exists()){
      console.log("处理弹窗");
      break;
    }
    sleep(1000);
  }
  while(text("关闭").exists()){
    console.log("处理弹窗");
    if (text("关闭").exists()) {
      text("关闭").findOne().click();
      console.log("关闭");
      sleep(1000);
    }else{
      console.log("弹窗处理完毕");
    }
    sleep(1000);
  }
}
while(text("摇红包").exists()){
  text("摇红包").findOne().click();
  ShakeHongBaoTimes=ShakeHongBaoTimes+1;
  console.info("第"+ShakeHongBaoTimes+"次摇红包" );
  sleep(2000);
  while(className("android.widget.Button").text("关闭").findOne() == null){
    sleep(1000);
    if(textcontains("摇到奖励啦").exists() |textcontains("收下继续摇").exists()){
      console.log("摇到<金币奖励>");
      sleep(1000);
      RewardTimes=RewardTimes+1;
      console.log("第"+RewardTimes+"个<金币奖励>领取成功");
      NullRewardTimes=0;//获得奖励后，重新开始计算次数
      sleep(1000);
      text("收下继续摇").findOne().click();
      sleep(2000);
      continue;
    }
  }
  //已到今日上限，结束循环，退出脚本
  if(text("明天再来").exists()){
    sleep(1000);
    text("明天再来").findOne().click();
    console.error("已到今日上限，即将退出脚本");
    sleep(2000);
    break;
  }
  //如果提示提示活动火爆，等待5秒后再进入循环
  if(text("好的，等会再来").exists()){
    sleep(1000);
    text("好的，等会再来").findOne().click();
    console.error("活动火爆，等待5秒");
    NullRewardTimes=NullRewardTimes+1;
    sleep(5000);
    continue;
  }
  //没有摇到红包，关闭弹窗后，直接进入下次循环
  if(className("android.widget.Button").text("关闭").exists()){
    sleep(1000);
    className("android.widget.Button").text("关闭").findOne().click();
    console.log("无奖励");
    NullRewardTimes=NullRewardTimes+1;
    sleep(2000);
    continue;
  }
  //多次无奖励后，退出脚本
  if(NullRewardTimes>50){
    console.error("连续50次无奖励，即将退出脚本");
    sleep(1000);
    break;
  }
}
console.info("当前红包金额："+text("我的红包").findOne().parent().child(1).text());
console.log("结束任务");
home();
sleep(1000);
console.log("已退出脚本"); 
engines.myEngine().forceStop()
