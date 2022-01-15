/*
  京东<集爆竹炸年兽>小程序任务
  需手动进入任务界面，注意脚本提醒

  Q：小程序脚本打开任务列表后识别不到任务
  A：检查下自己手机有没有打开什么悬浮窗，比如autojs的悬浮球、录屏的悬浮窗之类的，关掉再试试

  Q：为什么不停的在做任务，但是任务列表上只有一个已完成
  A：这个版本是这样的，继续运行就行，每次做的都是下面位置的任务，全做完了，列表也会全完成

  Q：为什么没有任务列表的时候也会继续识别任务，并且执行？
  A：这个版本是这样的，在脚本进入等待时间的时候，手动返回任务列表，并开启一个任务，后续任务就正常了

  20220114 V1.9
  任务识别延长到10秒，注意浮窗提示的当前应用名
  重复任务检测增加到8次才退出（前期任务量大的情况下，依然有可能会提前退出，再次执行脚本即可）
  修复累计浏览任务报错

 */
Start();
console.info("开始任务");
Run();

console.info("结束任务");

console.log("已退出脚本");
engines.myEngine().forceStop()


function Start() {
    auto.waitFor();//获取无障碍服务权限
    console.show();//开启悬浮窗
    console.info("京东<集爆竹炸年兽>微信小程序任务");

    //截图权限申请
    threads.start(function () {
        var beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            sleep(500);
            beginBtn.click();
        }
    });
    sleep(500);
    if (!requestScreenCapture(false)) {
        console.log("请求截图失败");
        exit();
    }
    console.log("请在10s内进入活动界面")
    for(var i = 0; i <= 10; i++){
        sleep(1000);
        console.log(10 - i)
    }
}

function Run(){
    if(!textContains("浏览8s可得").exists()){
        if(!textContains("后满").exists() |!textContains("爆竹满了").exists()){
            for(var i = 0; !textMatches(/.*消耗.*爆竹/).exists() && i < 10; i++){
                sleep(3000);
                if(textContains("后满").exists() |!textContains("爆竹满了").exists()){
                    break;
                }
                console.log("当前应用名:  " + app.getAppName(currentPackage()));
                console.log("未识别到活动相关界面，继续等待……")
            }
            if(i >= 10){
                console.log("未按时打开活动界面，退出当前任务");
                return;
            }
        }
        else{
            console.log("检测到活动页面");
            PageStatus=1//进入活动页面，未打开任务列表
        }
        console.log("准备打开任务列表");
        setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
        click(1300,2100);
        setScreenMetrics(device.width, device.height);//还原本机分辨率
        sleep(2000);
    }
    else{
        console.log("检测到任务列表");
        PageStatus=2//已打开任务列表
    }
    sleep(1000);
    let OverState = 0
    let OldtaskText = ""
    while (true) {
        for(var i = 0; i < 10; i++){
            if(textMatches(/.*浏览.*s.*|.*浏览.*秒.*|.*累计浏览.*|.*浏览即可得.*|.*浏览并关注可得.*|.*浏览可得.*/).exists()){
                break;
            }
            console.log("当前应用名:  " + app.getAppName(currentPackage())+ "\n"
                +"当前活动:  " + currentActivity()+ "\n"
                +"未识别到任务相关界面，继续等待……");
            sleep(1000);
        }
        if(i >= 10){
            console.log("未找到合适的任务，退出");
            sleep(3000);
            break;
        }
        let taskButtons = textMatches(/.*浏览.*s.*|.*浏览.*秒.*|.*累计浏览.*|.*浏览即可得.*|.*浏览并关注可得.*|.*浏览可得.*/).find()
        let taskButton, taskText
        let img = captureScreen()
        for (var i = 0; i < taskButtons.length; i++) {
            let item = taskButtons[i];
            taskText = item.text();
            item = item.parent().child(4);
            let b = item.bounds()
            let color = images.pixel(img, b.left+b.width()/8, b.top+b.height()/2)
            console.info("识别任务<" + item.parent().child(1).text() + ">中……");
            console.error("识别任务状态("+colors.red(color)+","+colors.green(color)+","+colors.blue(color)+")");
            if (colors.isSimilar(color, "#b5b5b5",40,"diff")) {
                console.log("任务已完成，即将识别下一任务");
            }
            else{
                //跳过任务
                //if (taskText.match(/成功入会/)) continue
                if (taskText.match(/成功入会/) && IsJoinMember == 0) {
                    console.log("识别到入会任务，当前设置为<不执行入会>，即将进入下一任务");
                    sleep(1000);
                    continue;
                }
                taskButton = item;
                break;
            }
        }
        img.recycle();//调用recycle回收
        if (!taskButton) {
            console.log("未找到可自动完成的任务，退出当前任务");
            console.log("互动任务需要手动完成");
            sleep(2000);
            break;
        }

        if (OldtaskText == taskText) {
            OverState = OverState + 1
        } else {
            OldtaskText = taskText
        }
        if(OverState > 8) {
            console.log("检测到重复执行相同任务，退出当前任务");
            sleep(2000);
            break;
        }

        function timeTask() {
            taskButton.click();
            sleep(1000);
            console.log("等待浏览任务完成……");
            let c = 0
            while (c < 9) { // 9秒，防止死循环
                let finish_reg = /获得.*?爆竹|浏览完成|已达上限/
                if ((textMatches(finish_reg).exists() || descMatches(finish_reg).exists())){ // 等待已完成出现，有可能失败
                    break;
                }
                sleep(1000);
                c++;
                if (c == 3 |c == 6 |c == 9){
                    console.log("已等待"+c+"秒");
                }
            }
            if (c >= 9) {
                console.log("任务时长已到,即将返回");
            }
            else{
                console.log("浏览时长任务完成");
            }
        }

        function itemTask(cart) {
            var boundsX = 0;
            var boundsY = 0;
            taskButton.click();
            sleep(1000);
            console.log("等待进入商品列表……");
            //textEndsWith("4个商品领爆竹").waitFor();//当前页浏览加购4个商品领爆竹|当前页点击浏览4个商品领爆竹
            for(var i = 0; i < 10; i++){
                console.log(10 - i);
                sleep(1000);
                if(textEndsWith("4个商品领爆竹").exists()){
                    break;
                }
                if(i >= 10){
                    console.error("超时未识别到关键字");
                    return;
                }
            }
            if(textEndsWith("4个商品领爆竹").exists()){
                for (let i = 0; i < 4; i++) {
                    let items = textEndsWith("4个商品领爆竹").findOne();
                    if (cart) {
                        console.log("加购并浏览");
                        boundsX = items.parent().parent().child(2).child(i).child(0).child(1).bounds().centerX();
                        boundsY = items.parent().parent().child(2).child(i).child(0).child(1).bounds().centerY();
                        click(boundsX,boundsY);
                    } else {
                        console.log("浏览商品页");
                        boundsX = items.parent().parent().child(2).child(i).child(0).child(1).bounds().centerX();
                        boundsY = items.parent().parent().child(2).child(i).child(0).child(1).bounds().centerY();
                        click(boundsX,boundsY);
                    }
                    sleep(1000);
                    console.log("返回");
                    back();
                    sleep(1000);
                    for(var ii = 0; !textEndsWith("4个商品领爆竹").exists(); ii++){
                        if(ii == 0){
                            console.log("返回");
                        }else {
                            console.log("再次返回");
                        }
                        back();
                        sleep(2000);
                        if(ii > 4){
                            console.error("任务异常，退出当前账号");
                            home();
                            return;
                        }
                    }
                    if (i >= 3) {
                        break;
                    }
                }
                console.log("浏览商品任务完成");
            }
            else{
                console.error("关键字异常，返回任务列表");
            }

        }

        if (taskText.match(/浏览.*s|浏览.*秒/)) {
            console.log("进行", taskText);
            timeTask();
        } else if (taskText.match(/累计浏览/)) {
            console.log("进行", taskText);
            if (taskText.match(/加购/)){
                itemTask(true);
            }
            else {
                itemTask(false);
            }
        } else if (taskText.match(/浏览并关注可得|浏览可得|浏览即可得/)) {
            console.log("进行", taskText);
            taskButton.click();
            sleep(2000);
            console.log("普通浏览任务完成");
        }

        back();
        sleep(1000);
        console.info("准备下一个任务");
        sleep(1500);
    }
    console.log("小程序所有任务完成");
}
