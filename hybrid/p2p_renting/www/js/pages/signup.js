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
        
        this.jxhlLocalVars[7].onclick = function(){
            jxhl.utility.loadJxhlLayout('signin');
        }
        
        this.jxhlLocalVars[6].onclick = function(){
            var mobile = $.trim(self.jxhlLocalVars[1].value);
            var userName = $.trim(self.jxhlLocalVars[0].value);
            var pwd = $.trim(self.jxhlLocalVars[2].value);
            var age = $.trim(self.jxhlLocalVars[4].value);
            var male = self.jxhlLocalVars[3].value==1?true:false;
            var userType = self.jxhlLocalVars[5].value;
            
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
            
            if(!age || !$.isNumeric(age) || parseInt(age)<18){
                self.jxhlLocalVars[4].focus();
                return;
            }
            
            self.doLogin.apply(self, [userName, mobile, pwd, 
            male, parseInt(age), userType]);
        }
    }
    
    Func.prototype.doLogin = function(userName, mobile, pwd,
        male, age, userType){
        var self = this;
        
        jxhl.utility.postJSON('register', null, 
            {userName: userName, mobile:mobile, password:pwd,
                male:male, age:age, userType:userType}, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
            
            common.DoLogin(res.data.token);
            common.SetUserSession(userName, res.data.userId);
            
            if(userType=='RENTER')
                jxhl.utility.loadJxhlLayout('renter/wait');
            else
                jxhl.utility.loadJxhlLayout('landlord/wait');
        },function(xhr, status){
            jxhl.utility.alert(status);
        });
    }

    module.exports = new Func();
});