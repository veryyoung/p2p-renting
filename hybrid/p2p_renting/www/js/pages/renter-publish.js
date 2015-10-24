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
        this.jxhlLocalVars[8].onclick = function(){
            var peopleNumber = $.trim(self.jxhlLocalVars[1].value);
            var acreage = $.trim(self.jxhlLocalVars[3].value);
            var minPrice = $.trim(self.jxhlLocalVars[4].value);
            var maxPrice = $.trim(self.jxhlLocalVars[5].value);
            var areaRange = $.trim(self.jxhlLocalVars[7].value);
            
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
            
            if(!minPrice || !$.isNumeric(minPrice) || parseInt(minPrice)<0){
                self.jxhlLocalVars[4].focus();
                return;
            }
            
            if(!maxPrice || !$.isNumeric(maxPrice) || parseInt(maxPrice)<0){
                self.jxhlLocalVars[5].focus();
                return;
            }
            
            if(!areaRange || !$.isNumeric(areaRange) || parseInt(areaRange)<0){
                self.jxhlLocalVars[7].focus();
                return;
            }
            
            self.doPublish.apply(self, [jointRent, peopleNumber,
            sexLimit, acreage, minPrice, maxPrice, areaRange]);
        }
       
        //LBS
    }
    
    Func.prototype.doPublish = function(jointRent, peopleNumber,
            sexLimit, acreage, minPrice, maxPrice, areaRange){
        var self = this;
        var data = {jointRent:jointRent, peopleNumber:peopleNumber,
            sexLimit:sexLimit, acreage:acreage, 
            minPrice:minPrice, maxPrice:maxPrice, 
            areaRange:areaRange, community: "上地家园", 
            x:116.321306, y:40.041165};
            
        jxhl.utility.postJSON('info/publish/renter', null, 
            data, function(res){
            if(!res.success){
                jxhl.utility.alert(res.comment);
                return;
            }
   
            jxhl.utility.loadJxhlLayout('renter/suggest', [res.data.id]);
        });
    }

    module.exports = new Func();
});