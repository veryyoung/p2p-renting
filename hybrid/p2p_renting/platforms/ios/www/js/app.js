/**
 * Created by XiaoJunfeng on 14/11/7.
 *
 * This is a global initialization for rmbbox.com
 * It must be place after sea.js
 *
 */
if(typeof(window.HaloApp)!="object") window.HaloApp = {};
window.HaloApp['html5'] = document.createElement("canvas").getContext ? true : false;
window.HaloApp['dev'] = window.location.href.indexOf("?dev=")>0;
window.HaloApp['isMobile'] = /Android|webOS|iOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.HaloApp['isNarrow'] = window.innerWidth <= 780;
window.HaloApp['isDownLevel'] = /MSIE 6|MSIE 7/.test(navigator.userAgent);

if(!window.HaloApp['baseUrl']) {
    window.HaloApp['baseUrl'] = '/me/';
}

if(window.HaloApp['isMobile'] || window.HaloApp['isNarrow']){
    //jxhl.utility.loadCssFile(window.HaloApp['baseUrl'] + 'css/app-mobile.css', document.head);
}else {
    jxhl.utility.loadCssFile(window.HaloApp['baseUrl'] + 'css/app-web.css', document.head);
}

//fix console, ie8 and down level browsers
if(typeof(console) === "undefined") {
    console = {};
}
if(typeof(console.log) === "undefined") {
    console.log = function() {
    };
}

//fix JSON
if(typeof JSON == 'undefined')
    document.write('<script src="'+window.HaloApp['baseUrl']+'js/json2.js" type="text/javascript"></script>');

seajs.config({
    base: window.HaloApp['baseUrl'] + "js/"
});
// Set configuration
if(window.HaloApp.html5){
    // register jQuery to global
    document.write('<script src="'+window.HaloApp['baseUrl']+'js/jquery-2.1.1.min.js" type="text/javascript"></script>');
}
else{
    // register jQuery to global
    document.write('<script src="'+window.HaloApp['baseUrl']+'js/jquery-1.11.1.min.js" type="text/javascript"></script>');
}

window.onbeforeunload = function (e) {
    return '离开页面将丢失当前会话';
}

window.HaloApp['ipaoto_wx_share_obj'] = null;
function ShareWxGroup(obj){
    if(typeof wx == 'undefined')
        return;
    var _title = '爱跑团';
    var _link = 'http://www.ipaoto.com/Wechat/LoginRoute';
    var _linkOut = 'http://www.ipaoto.com/me';
    var _imgUrl = 'http://www.ipaoto.com/me/images/ipaoto.com.png';
    var _desc = '跑者与跑团的家园，跑步打卡，活动签到，统计排名，跑团运营与管理神器。';
    if (window.HaloApp['ipaoto_wx_share_obj'] != null)
        obj = window.HaloApp['ipaoto_wx_share_obj'];
    if (obj) {
        if (window.HaloApp['ipaoto_wx_share_obj'] == null)
            window.HaloApp['ipaoto_wx_share_obj'] = obj;
        _title = obj.GroupName;
        _link = 'http://www.ipaoto.com/Wechat/LoginRoute?view=group/detail-in&module=group&args=' + obj.Id;
        _linkOut = 'http://www.ipaoto.com/me?view=group/detail-in&module=group&args=' + obj.Id;
        _desc = obj.Signature || '';
        _imgUrl = obj.HeadPhoto? obj.HeadPhoto.replace(/\{0\}/, ''):'/me/images/group-def.png';
    }
    if (_imgUrl && _imgUrl.toLowerCase().indexOf('http') != 0) {
        _imgUrl = 'http://www.ipaoto.com' + _imgUrl;
    }

    function injectWx() {

        wx.onMenuShareTimeline({
            title: _title, // 分享标题
            link: _link, // 分享链接
            imgUrl: _imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: _title, // 分享标题
            desc: _desc, // 分享描述
            link: _link, // 分享链接
            imgUrl: _imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: _title, // 分享标题
            desc: _desc, // 分享描述
            link: _linkOut, // 分享链接
            imgUrl: _imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareWeibo({
            title: _title, // 分享标题
            desc: _desc, // 分享描述
            link: _linkOut, // 分享链接
            imgUrl: _imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    try {
        injectWx();
    } catch (x) { }
}

