/**
 * Created by vine.
 */

define(['module', 'common'], function (module, common) {
    'use strict';

    function Func() {
        this.jxhlContainer = null;
        this.jxhlArguments = null;
        this.jxhlLocalVars = null;
    }

    Func.prototype.init = function (container, args, vars) {
        this.jxhlContainer = container;
        this.jxhlArguments = args;
        this.jxhlLocalVars = vars;

        this.bindEvent.apply(this, []);
    }

    Func.prototype.bindEvent = function () {
        var self = this;

        // chat
        var messageList = jxhl.utility.getLocalStorage('Chat_Messages');
        if (!messageList)
            messageList = new Array();

        // todo
        this.renderMsg.apply(self, [messageList, false]);
        
        var appId = 'iomVykoTyAfpSi1IM1AavYLs';
        var userId = this.jxhlArguments[0]=='renter'?'2':'1';//common.getUserSession()[2];
        var otherId = this.jxhlArguments[0]=='renter'?'1':'2';//jxhl.utility.getLocalStorage('Renting_OtherName');
        var firstFlag = true;
        var conv;
        var convOld;
        
        var rt = AV.realtime({
            appId: appId,
            clientId: clientId,
            // 是否开启 HTML 转义，防止 XSS
            encodeHTML: true
            // 是否开启服务器端认证
            // auth: authFun
        });
        
        this.jxhlLocalVars[1].onclick = function () {
            var message = $.trim(self.jxhlLocalVars[0].value);

            if (!message) {
                self.jxhlLocalVars[0].focus();
                return;
            }
            
            var msg = {
                date: new Date(),
                msg: message
            };

            // 向这个 Conversation 中发送消息
            conv.send(msg, function (data) {
                console.log('发送的消息服务端已收到：', data);
                messageList.push(msg);
                self.renderMsg.apply(self, [msg, true]);
                self.jxhlLocalVars[0].text('');
            });
        }
        
        // 当前 SDK 版本
        console.log('欢迎使用 LeanCloud 实时通信，当前 SDK 版本是 ' + AV.realtime.version);

        // 实时通信服务连接成功
        rt.on('open', function () {
            console.log('实时通信服务建立成功！');
            // 因为断开重连还会触发一次 open 事件，所以用一个状态标记下
            if (firstFlag) {
                firstFlag = false;

                // 创建一个聊天室
                conv = rt.conv({

                    // 人员的 id
                    members: [
                        userId,
                        otherId
                    ],

                    // Conversation 的名字
                    name: 'p2p-renting',

                    // 创建暂态的聊天室
                    // transient: true,

                    // 默认的数据，可以放 Conversation 一些属性
                    attr: {
                        test: 123
                    }
                }, function (data) {
                    if (data) {
                        console.log('Conversation 创建成功!', data);
                    }
                });

                // 查询当前 Conversation 的相关信息
                rt.query(function (data) {
                    console.log('查询 Conversation 所有相关信息：', data);
                });
                // 查询对应 clientId 的用户是否处于在线状态
                rt.ping([
                    userId,
                    otherId
                ], function (data) {
                    console.log('查询用户在线状态：', data);
                    self.jxhlLocalVars[2].text(data);
                });
            }
        });
        // 当聊天断开时触发
        rt.on('close', function () {
            console.log('实时通信服务被断开！');
        });

        // 当 Conversation 被创建时触发，当然您可以使用回调函数来处理，不一定要监听这个事件
        rt.on('create', function (data) {

            // 当前用户加入这个 Conversation
            conv.join(function (data) {
                console.log('当前用户成功加入 Conversation');
            });

            // 当前用户离开这个 Conversation
            conv.leave(function (data) {
                console.log('当前用户成功离开 Conversation');
            });
            // 当前 Conversation 接收到消息
            conv.receive(function (data) {
                console.log('当前 Conversation 收到消息：', data);
                messageList.push(data);
                self.renderMsg.apply(self, [data, true]);
            });
        });
    }

    Func.prototype.renderMsg = function(list, single){
        var self = this;

        function innerDo(msg){
            $(self.jxhlLocalVars[3]).append('<div class="row" style="margin-left:0px; margin-right:0px;">\
            <div>'+msg.date+'</div>\
            <div>'+msg.msg+'</div>\
            </div>');
        }

        if(single){
            innerDo(list);
            return;
        }

        self.jxhlLocalVars[3].innerHTML = '';
        for(var i=0; i<list.length; i++){
            innerDo(list[0]);
        }
    }

    module.exports = new Func();
});