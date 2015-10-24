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
        
        //提交事件
        this.jxhlLocalVars[10].onclick = function(){
            var peopleNumber = $.trim(self.jxhlLocalVars[1].value);
            var acreage = $.trim(self.jxhlLocalVars[3].value);
            var roomCount = $.trim(self.jxhlLocalVars[4].value);
            var price = $.trim(self.jxhlLocalVars[5].value);
            var doorNumber = $.trim(self.jxhlLocalVars[6].value);
            var traffic = $.trim(self.jxhlLocalVars[8].value);
            var arround = $.trim(self.jxhlLocalVars[9].value);
            
            var sexLimit = self.jxhlLocalVars[2].value;
            var jointRent = self.jxhlLocalVars[0].value == '1'?true:false;
            
            if(!peopleNumber || !$.isNumeric(peopleNumber) 
                || parseInt(peopleNumber)<0){
                self.jxhlLocalVars[1].focus();
                return;
            }
            
            if(!acreage || !$.isNumeric(acreage) || parseInt(acreage)<0){
                self.jxhlLocalVars[3].focus();
                return;
            }
            
            if(!roomCount || !$.isNumeric(roomCount) || parseInt(roomCount)<0){
                self.jxhlLocalVars[4].focus();
                return;
            }
            
            if(!price || !$.isNumeric(price) || parseInt(price)<0){
                self.jxhlLocalVars[5].focus();
                return;
            }
            
            if(!doorNumber){
                self.jxhlLocalVars[6].focus();
                return;
            }
            
            if(!traffic){
                self.jxhlLocalVars[8].focus();
                return;
            }
            
            if(!arround){
                self.jxhlLocalVars[9].focus();
                return;
            }
            
            self.doPublish.apply(self, [jointRent, peopleNumber,
            sexLimit, acreage, roomCount, price, doorNumber,
            traffic, arround]);
        }
       
        //LBS
    }
    
    Func.prototype.doPublish = function(jointRent, peopleNumber,
            sexLimit, acreage, roomCount, price, doorNumber,
            traffic, arround){
        var self = this;
        var data = {jointRent:jointRent, peopleNumber:peopleNumber,
            sexLimit:sexLimit, acreage:acreage, 
            roomCount:roomCount, price:price, 
            doorNumber:doorNumber, traffic:traffic,
            arround:arround, community: "上地家园",
             x:116.321306, y:40.041165};
        //TODO: image base64
            
        jxhl.utility.postJSON('info/publish/landlord', null, 
            data, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
   
            jxhl.utility.loadJxhlLayout('landlord/suggest', [res.data.id]);
        });
    }

    module.exports = new Func();
});