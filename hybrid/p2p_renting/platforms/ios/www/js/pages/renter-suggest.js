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
       this.load.apply(this, []);
    }
    
    Func.prototype.bindEvent = function(){
        var self = this;
        
        self.jxhlLocalVars[1].onclick = function(){
            self.load.apply(self, []);
        }
       
    }
    
    Func.prototype.load = function(){
        var self = this;
        self.jxhlLocalVars[0].innerHTML = '最佳房东查询中..';
        $(self.jxhlLocalVars[0]).prop('disabled', true);
        
        jxhl.utility.getJSON('info/refer/renter', null,
        null, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
            self.renderData.apply(self, [res.data]);
        });
    }
    
    Func.prototype.renderData = function(data){
        var self = this;
        
        self.jxhlLocalVars[0].innerHTML = '';
        $(self.jxhlLocalVars[0]).prop('disabled', false);
        for(var i=0; i<data.length; i++){
            var item = data[i];
            $(self.jxhlLocalVars[0]).append('<div class="row" style="margin-left:0px; margin-right:0px;" data-id="'+data.id+'" data-row="dx_'+i+'">\
            <div>房源位于：'+item.community+'</div>\
            <div>'+(item.jointRent?'合租':'整租')+', '+
            item.price+'元</div>\
            </div>');
            
            self.attachEvent.apply(self, [$(self.jxhlLocalVars[0]).find('div[data-row=dx_'+i+']').get(0)]);
        }
    }
    
    Func.prototype.attachEvent = function(row){
        var self = this;
        
        row.onclick = function(){
            var id = $(row).attr('data-id');
            jxhl.utility.loadJxhlLayout('chat', ['renter', id]);
        }
    }

    module.exports = new Func();
});