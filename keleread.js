/**
 * 更新说明：
 * 修复阅读接口ssl证书过期导致无法正常执行的问题
 * ======================================
 * 
 * 可乐读书 V2.31
 * const $ = new Env("可乐读书");
 * 
 * cron 0 7-23 * * * 可乐读书.js

 * 定时，7点至23点，每1小时1次
 * 配置推送，提现秒到，第一篇疑似检测文章，需配置推送，检测不过黑24小时后方可阅读

 * 【提示】：如果进不去，运行下脚本，日志会输出最新入口，基本是那个可以进去
 * 入口 微信打开：http://95420402271058.asljbfj.cn/r?upuid=954204

 * 
 * ========= 青龙--配置文件 ===========
 * # 项目名称
 * export klds='抓包Cookie'
 * 
 * 代挂他人的且让对方自己点的 可如下配置，【单账户单独指定推送该账号的推送】
 * 注意，这种方式优先于下面的全局推送：
 * 1. 如果使用 wxpusher公众号推送
 * 格式为：抓包Cookie#appToken#topicId
 * 2. 如果使用企业微信推送
 * 格式为：抓包Cookie#企业微信推送webhook后面的key
 * 
 * 不清楚这平台阅读api是否有检测用户UA，由于遇见有些新号一抓上来就跑不了先黑2天才能跑，因此增加个【单独账号指定UA】：
 * 1. 如果使用 wxpusher公众号推送
 * 格式：抓包Cookie#AppToken#TopicId#该账号协议头里的UserAgent
 * 2. 如果使用企业微信推送
 * 格式：抓包Cookie#企业微信推送webhook后面的key#该账号协议头里的UserAgent
 * 
 * 提示：如果不想给这个号单独配置推送，可以直接 推送配置项留空 即可哦，这样之前配置的如果没问题也不用加UA
 * 不单独配置的格式是这样的（#保留，参数不填，要是再看不懂那我没办法了）：抓包Cookie###该账号协议头里的UserAgent
 * 
 * 提现到支付宝，需要在第五个参数和第六个参数填写内容，第一个ck是必填，其他的非必填可跳过：
 * 跳过其他参数的写法：抓包Cookie####该账号要提现的支付宝姓名#该账号要提现的支付宝账号
 * 
 * 自己抓包复制这个完整Ck，搜索 udtauth3 可获取，Cookie需要包含 udtauth3！

 * 多账号换行或&隔开

 * 奖励：自动阅读，自动提现

 * 【支持并发】（默认1线程，请自行修改）
 * export kldsConcurrentThreads="10"
 * 如果你头铁，可以直接禁用推送，不再推送到微信，避免通知吵到你：
 * export kldsDisabledPushCheck="true"
 * 如果你就想手动阅读，而不是推送，则可开启脚本检测必须手动阅读过后才阅读的开关
 * export kldsEnableReadAfterPerson="true"
 * 
 * 全局推送配置（所有号公用推送，必须配置，不配置过不去检测，会黑24小时！）：
 * 1. 如果使用 wxpusher公众号推送
 * export wxpusherAppToken="填wxpusher的appToken"
 * export wxpusherTopicId="这个是wxpusher的主题topicId"
 * 也可直接在环境变量里新建变量添加
 * 具体使用方法请看文档地址：https://wxpusher.zjiecode.com/docs/#/
 * 
 * 2. 如果使用企业微信推送
 * export qywxRobotKey="企业微信推送webhook后面的key"
 * 官方说明文档：https://work.weixin.qq.com/api/doc/90000/90136/91770
 * 
 * 自定义延迟时间，单位为 秒
 * export kldsDelayTime="60"
 *
 * 自定义检测父级ID：
 * 如果你想限制跑的账号必须是你自己邀请的人的话（注意：只支持 3级以内的号 ）
 * export kldsCustomerizeId="你的可乐阅读id"
 * 禁用检测父级id（默认开启，也就是不检测，设置为 false代表关闭禁用/不禁用检测，也就是检测）
 * export kldsDisabledCheckParent="false"
 * 
 * 自定义阅读文章的时间：
 * 默认是 0-23小时，也就是整天都阅读（意味着任务定时启动了就一定会尝试阅读，如果你想某个时间点只启动用于提现，就可以限制这个阅读时间），格式是 [起始时间,结束时间]
 * export kldsReadTimeRange="[0,23]"
 * ====================================
 *   
 */