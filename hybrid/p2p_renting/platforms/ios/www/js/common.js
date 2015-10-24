/**
 * Created by xjf on 15/3/10.
 * 用于运行时调用一些方法
 */

;define(['module'],function (module) {
    "use strict";

    var lib = {};

    /**
     * 全局筛选REST返回的数据，过滤登录账号过期等
     * @param rest
     * @constructor
     */
    lib.FilterRestData = function(rest){
        if(rest.Success) return;
        if(rest.Code == 'expired'){
            delete window.Renting_AccessToken;
            delete window.Renting_UserName;
            delete window.Renting_Profile;
            delete window.Renting_UserId;
            
            jxhl.utility.setLocalStorage('Renting_AccessToken', '');
            jxhl.utility.setLocalStorage('Renting_UserName', '');
            
            jxhl.utility.loadJxhlLayout('signin');
            return;
        }
    }

    lib.RequireLogin = function(){
        // if(!window.Renting_AccessToken){
        //     window.Renting_AccessToken = jxhl.utility.getLocalStorage('Renting_AccessToken');
        // }
        if (!window.Renting_AccessToken) {
            jxhl.utility.loadJxhlLayout('signin');
            return false;
        }
        return true;
    }
    
    lib.DoLogin = function(token){
        window.Renting_AccessToken = token;
        //jxhl.utility.setLocalStorage('Renting_AccessToken', token);
    }

    lib.GetUserSession = function () {
        return [window.Renting_AccessToken, window.Renting_UserName, window.Renting_UserId];
    }
    
    lib.SetUserSession = function(userName, userId){
        window.Renting_UserName = userName;
        window.Renting_UserId = userId;
    }

    lib.Alert = function (str) {
        if (!str) return;
        alert(str);
    }

    module.exports = lib;

});
