/**
 * Created by xjf
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
        
        this.jxhlLocalVars[0].onclick = function(){
            jxhl.utility.loadJxhlLayout('renter/publish');
        }
        this.jxhlLocalVars[1].onclick = function(){
            jxhl.utility.loadJxhlLayout('renter/suggest');
        }
    }

    module.exports = new Func();
});