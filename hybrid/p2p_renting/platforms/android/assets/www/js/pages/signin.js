/**
 * Created by xjf on 15/6/16.
 */

define(['module', 'common'],function(module, common){
    'use strict';

    function Func(){
        this.jxhlContainer = null;
        this.jxhlArguments = null;
        this.jxhlLocalVars = null;
    }

    Func.prototype.init = function(container, args, vars){
        this.jxhlContainer = container;
        this.jxhlArguments = args;
        this.jxhlLocalVars = vars;
       
       this.bindEvent.apply(this, []);
    }
    
    Func.prototype.bindEvent = function(){
        var self = this;
        
        this.jxhlLocalVars[3].onclick = function(){
            jxhl.utility.loadJxhlLayout('signup');
        }
        
        this.jxhlLocalVars[2].onclick = function(){
            var mobile = $.trim(self.jxhlLocalVars[0].value);
            var pwd = $.trim(self.jxhlLocalVars[1].value);
            
            if(!mobile){
                self.jxhlLocalVars[0].focus();
                return;
            }
            
            if(!pwd){
                self.jxhlLocalVars[1].focus();
                return;
            }
            
            self.doLogin.apply(self, [mobile, pwd]);
        }
    }
    
    Func.prototype.doLogin = function(mobile, pwd){
        var self = this;
        
        jxhl.utility.postJSON('login', null, 
            {userName: mobile, password:pwd}, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
            
            common.DoLogin(res.data.token);
            common.SetUserSession(res.data.userName, res.data.userId);
            
            jxhl.utility.loadJxhlLayout('profile');
        });
    }

    module.exports = new Func();
});