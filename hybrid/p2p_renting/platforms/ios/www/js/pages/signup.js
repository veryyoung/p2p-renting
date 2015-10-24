/**
 * Created by xjf.
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
        
        this.jxhlLocalVars[4].onclick = function(){
            jxhl.utility.loadJxhlLayout('signin');
        }
        
        this.jxhlLocalVars[3].onclick = function(){
            var mobile = $.trim(self.jxhlLocalVars[1].value);
            var userName = $.trim(self.jxhlLocalVars[0].value);
            var pwd = $.trim(self.jxhlLocalVars[2].value);
            
            if(!userName){
                self.jxhlLocalVars[0].focus();
                return;
            }
                        
            if(!mobile){
                self.jxhlLocalVars[1].focus();
                return;
            }
            
            if(!pwd){
                self.jxhlLocalVars[2].focus();
                return;
            }
            
            self.doLogin.apply(self, [userName, mobile, pwd]);
        }
    }
    
    Func.prototype.doLogin = function(userName, mobile, pwd){
        var self = this;
        
        jxhl.utility.postJSON('register', null, 
            {userName: userName, mobile:mobile, password:pwd}, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
            
            common.DoLogin(res.data.token);
            common.SetUserSession(userName, res.data.userId);
            
            jxhl.utility.loadJxhlLayout('profile');
        });
    }

    module.exports = new Func();
});