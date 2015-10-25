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
        
        //$(container).find('div[local-id=div-main]').html('haha! fun!');
        
        //注入需要登录
        //common.RequireLogin();
        
        jxhl.utility.loadJxhlLayout('chat', ['renter', 1]);
    }

    module.exports = new Func();
});