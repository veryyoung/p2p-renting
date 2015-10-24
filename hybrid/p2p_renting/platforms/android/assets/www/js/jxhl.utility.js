jxhl.extension(function () {
    // utility methods

    var $$jxhl = this;

    /**
     * @class Utility
     * @constructor
     */
    function Utility() {
        //this.baseUri = (window.location.protocol||"http:") + "//";
        //use uri route from root, so the baseUri is empty
        this.baseUri = "";
        this.apiUri = "http://192.168.22.65:8080/";
        this.isDeviceScrolling = false;
        this.topContainer = null;
        this.debugContainer = null;
    }

    /**
     * a common error handle for all xhr
     *
     * @method errorHandle
     * @param {Object} jqXHR http://api.jquery.com/Types/#jqXHR
     * @param {String} textStatus "null", "timeout", "error", "abort", and "parsererror"
     * @param {String} errorThrown textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."
     */
    Utility.prototype.errorHandle = function (jqXHR, textStatus, errorThrown) {
        //alert([textStatus, errorThrown]);
        this.debugObject([textStatus, errorThrown]);
        this.alert(errorThrown);
    }

    /**
     * Convert ajax send data format
     *
     * @method convertSendData
     * @param {Object} json A json format data
     * @param {String} [type='json'] "json" or "query", which decides the send data is json string or query string
     * @return {String} Returns the formatted data string
     */
    Utility.prototype.convertSendData = function(json, type){
        if(typeof(json)=="undefined" || json==null) return null;
        if(typeof(json)=="string") return json;
        if(type && type=="json")
           return JSON.stringify(json);
        var arr = [];
        for(var n in json){
            arr.push(n + "=" + (json[n]||""));
        }
        return arr.join("&");
    }

    /**
     * Get native XMLHttpRequest object
     *
     * @method xmlHttpRequest
     * @returns {Object} Returns XMLHttpRequest
     */
    Utility.prototype.xmlHttpRequest = function(){
        if(typeof(XMLHttpRequest)!="undefined"){
            return new XMLHttpRequest();
        }
        return new ActiveXObject("Microsoft.XMLHTTP");
    }

    /**
     * Override ajax method
     *
     * @method ajax
     * @param {String} url REST uri
     * @param {String} ajaxType GET,PUT,POST,DELETE
     * @param {Object} headers A json object for request header
     * @param {Object} data A json object or string for post/get/put, because the rest use uri route, this will be json
     * @param {String} dataType html,xml,json,script,text,jsonp
     * @param {Function} callback A function which will be run after success
     * @param {Function} errorCallback A function which will be run when error
     */
    Utility.prototype.ajax = function(url, ajaxType, headers, data, dataType, callback, errorCallback){
        var self = this;
        url = this.apiUri + url;
        headers = headers||{};
        if(window._xddApp && window._xddApp['token'] && window._xddApp['token'].token){
            headers.token = window._xddApp['token'].token;
        }
        if(typeof(jQuery)!="undefined"){
            console.log("Using jQuery XHR..");
            //JSON parse has an issue with json type, such as {firstname:"Jeff",lastname:"Xiao"} will cause a parsererror
            //please return quote with json data name
            $.ajax({
                async: true,
                cache: false,
                contentType: headers["Content-Type"]||"application/x-www-form-urlencoded",
                timeout:10000,
                type: ajaxType || "GET",
                url: url,
                data: data, //self.convertSendData(data, "query"),
                headers: headers,
                dataType: dataType || "html",
                success: function (data, textStatus, jqXHR) {
                    console.log("XHR returns 200 ok.");
                    if (typeof (callback)=="function") {
                        console.log(["callback call", callback]);
                        callback(data, textStatus, jqXHR);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("XHR returns error " + textStatus);
                    if(typeof(errorCallback)=="function")
                        errorCallback(jqXHR, textStatus, errorThrown);
                    else
                        self.errorHandle(jqXHR, textStatus, errorThrown);
                }
            });
            return;
        }

        //if there is no jQuery, use normal xhr
        var xhr = this.xmlHttpRequest();
        console.log("Using native XHR..");
        if(xhr==null) {
            if(typeof(errorCallback)=="function")
                errorCallback(null, "error", "Your browser does not support XMLHTTP.");
            else
                this.errorHandle(null, "error", "Your browser does not support XMLHTTP.");
            return
        }
        xhr.onreadystatechange = stateChange;
        //always use async, note : ios webkit rejects async=false
        xhr.open(ajaxType||"GET", url, true);

        if(ajaxType && ajaxType.toUpperCase() =="POST")
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        //add headers
        if(headers && typeof(headers)=="object") {
            for (var n in headers) {
                if(!n) continue;
                xhr.setRequestHeader(n, headers[n]||"");
            }
        }

        if(headers && header["Content-Type"] && header["Content-Type"] == "application/json")
            xhr.send(this.convertSendData(data, "json"));
        else
            xhr.send(this.convertSendData(data, "query"));

        function stateChange(){
            // 4 = "Loaded"
            if (xhr.readyState==4){
                // 200 = OK
                if (xhr.status==200){
                    console.log("XHR returns 200 ok.");
                    var dataText = xhr.responseText;
                    //just use json,text,html,xml  ignore others
                    var result = dataText;
                    var dt = (dataType||"html").toLowerCase();
                    try {
                        switch (dt) {
                            case "xml":
                                result = xhr.responseXML;
                                break;
                            case "json":
                                result = eval("(" + dataText + ")");
                                break;
                            case "html":
                            case "text":
                            default :
                                result = dataText;
                                break;
                        }

                        //callback here
                        if (typeof (callback)=="function")
                            callback(result);
                    }
                    catch(x){
                        if(typeof(errorCallback)=="function")
                            errorCallback(null, "error", x.message);
                        else
                            self.errorHandle(null, "error", x.message);
                    }
                }
                else{
                    console.log("XHR returns error " + xhr.status);
                    if(typeof(errorCallback)=="function")
                        errorCallback(null, "http error " + xhr.status, "Problem retrieving XML data");
                    else
                        self.errorHandle(null, "http error " + xhr.status, "Problem retrieving XML data");
                }
            }

        }

    }

    /**
     * a get method ajax returns json data
     *
     * @method getJSON
     * @param {String} api API path
     * @param {Object} headers headers A json object for request header
     * @param {Object} data dataType html,xml,json,script,text,jsonp
     * @param {Function} callback callback A function which will be run after success
     * @param {Function} errorCallback errorCallback A function which will be run when error
     */
    Utility.prototype.getJSON = function(api, headers, data, callback, errorCallback){
        this.ajax(api, "GET", headers, data, "json", callback, errorCallback);
    }

    /**
     * a get method ajax returns html/text
     *
     * @method get
     * @param {String} api API path
     * @param {Object} headers headers A json object for request header
     * @param {Object} data dataType html,xml,json,script,text,jsonp
     * @param {Function} callback callback A function which will be run after success
     * @param {Function} errorCallback errorCallback A function which will be run when error
     */
    Utility.prototype.get = function(api, headers, data, callback, errorCallback){
        this.ajax(api, "GET", headers, data, "html", callback, errorCallback);
    }

    /**
     * a post method ajax that just send json data(Content-Type is application/json), returns json data
     *
     * @method sendJSON
     * @param {String} api API path
     * @param {Object} headers headers A json object for request header
     * @param {Object} data dataType html,xml,json,script,text,jsonp
     * @param {Function} callback callback A function which will be run after success
     * @param {Function} errorCallback errorCallback A function which will be run when error
     */
    Utility.prototype.sendJSON = function(api, headers, data, callback, errorCallback){
        headers = headers || {};
        headers["Content-Type"] = "application/json";
        this.ajax(api, "POST", headers, JSON.stringify(data), "json", callback, errorCallback);
    }

    /**
     * a post method ajax returns json data
     *
     * @method postJSON
     * @param {String} api API path
     * @param {Object} headers headers A json object for request header
     * @param {Object} data dataType html,xml,json,script,text,jsonp
     * @param {Function} callback callback A function which will be run after success
     * @param {Function} errorCallback errorCallback A function which will be run when error
     */
    Utility.prototype.postJSON = function(api, headers, data, callback, errorCallback){
        this.ajax(api, "POST", headers, data, "json", callback, errorCallback);
    }

    /**
     * a post method ajax returns html/text
     *
     * @method post
     * @param {String} api API path
     * @param {Object} headers headers A json object for request header
     * @param {Object} data dataType html,xml,json,script,text,jsonp
     * @param {Function} callback callback A function which will be run after success
     * @param {Function} errorCallback errorCallback A function which will be run when error
     */
    Utility.prototype.post = function(api, headers, data, callback, errorCallback){
        this.ajax(api, "POST", headers, data, "html", callback, errorCallback);
    }

    /**
     * set cookie, non-comment use
     *
     * @method setCookie, non-comment use, please use setLocalStorage instead
     * @param {String} name
     * @param {String} value
     * @param {Int} day
     */
    Utility.prototype.setCookie = function(name, value, day) {
        var Days = day || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    /**
     * get cookie, non-comment use
     *
     * @method getCookie, non-comment use, please use getLocalStorage instead
     * @param {String} name
     * @returns {String}
     */
    Utility.prototype.getCookie = function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null)
            return unescape(arr[2]);
        return null;
    }

    /**
     * check if the browser support local storage
     *
     * @returns {boolean}
     */
    Utility.prototype.isLocalStorageSupported = function()
    {
        if (typeof (window.localStorage) == "undefined") return false;
        var testKey = 'test', storage = window.sessionStorage;
        try{
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    /**
     * get local storage, which use html5 local storage first; if down-level browser, it will use cookie
     *
     * @method getLocalStorage
     * @param {String} name
     * @returns {*}
     */
    Utility.prototype.getLocalStorage = function(name) {
        if (!this.isLocalStorageSupported())
            return this.getCookie(name);
        return window.localStorage.getItem(name);
    }

    /**
     * set local storage, which use html5 local storage first; if down-level browser, it will use cookie
     *
     * @method setLocalStorage
     * @param {String} name
     * @param {Object} value
     */
    Utility.prototype.setLocalStorage = function(name, value) {
        if (!this.isLocalStorageSupported())
            this.setCookie(name, value);
        else
            window.localStorage.setItem(name, value);
    }

    /**
     * 获取Url的参数值
     *
     * @method getURLParameter
     * @param {String} name 参数名
     * @param {String} win window对象
     */
    Utility.prototype.getURLParameter = function(name, win) {
        if(!win)
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
            );
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(win.location.search) || [, null])[1]
        );
    }

    /**
     * 设置Url的参数值
     *
     * @method setURLParameter
     * @param {String} url 要设置的Url
     * @param {String} name 参数名
     * @param {String} v 参数值
     */
    Utility.prototype.setURLParameter = function(url, name, value){
        if (!url) return "";
        if (url.indexOf("?") == -1) return url += "?" + name + "=" + encodeURI(value);
        var absurl = url.split("?")[0];
        var query = url.split("?")[1];
        var vars = query.split("&");
        var isfound = false;
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == name) {
                vars[i] = pair[0] + "=" + encodeURI(value);
                isfound = true;
            }
        }
        if (!isfound)
            url += "&" + name + "=" + encodeURI(value);
        else
            url = absurl + "?" + vars.join("&");
        return url;
    }

    Utility.prototype.debugObject = function(obj, cleanFirst){
        console.log(obj);
        if(this.debugContainer){
            if(cleanFirst) this.debugContainer.innerHTML = '';
            var div = document.createElement('div');
            div.innerHTML = "[DEBUG "+ new Date().getTime() + "] -- " + (typeof(obj)=="function"?obj.toString():JSON.stringify(obj));
            this.debugContainer.appendChild(div);
            return;
        }

        //alert(JSON.stringify(obj));
    }

    Utility.prototype.attachClickEvent = function(target, func){
        var self = this;
        var isTouch = "ontouchstart" in document;
        if(!isTouch){
            target.onclick = function(e){
                func.apply(this,[e]);
                e.stopPropagation();
                e.preventDefault();
            }
            return;
        }
        target.ontouchstart = function (e) {
            try{
                e.stopImmediatePropagation();
            }
            catch (x) {

            }
            e.preventDefault();
            self.isDeviceScrolling = false;
        }
        target.ontouchmove = function(e){
            self.isDeviceScrolling = true;
        }
        target.ontouchend = function (e) {
            try {
                e.stopImmediatePropagation();
            }
            catch (x) {

            }
            e.stopPropagation();
            //ios only
            e.preventDefault();
            if(self.isDeviceScrolling) return;
            func.apply(this,[e]);
        }
    }

    Utility.prototype.triggerClickEvent = function(target){
        var m = "ontouchstart" in document;
        if(!isTouch){
            target.onclick();
            return;
        }
        try{
            target.ontouchend();
        }
        catch(x){
            console.log(x.message)
        }
    }

    /**
    * 加载在线css文件

    * @method LoadCssFile
    * @param {String} path Css File 的 Web路径
    */
    Utility.prototype.loadCssFile = function(path, p){
        if (!path)
            return;
        var genId = "dynamic_res_" + path.split("?")[0].replace(/\//g, "_").replace(/./g, "_").replace(/-/g, "_").replace(/:/g, "");
        var cssTag = document.getElementById(genId);
        var firstchild = document.body.firstChild;
        if (!cssTag) {
            cssTag = document.createElement("link");
            cssTag.id = genId;
            cssTag.rel = "stylesheet";
            cssTag.href = path;
            if (!p) {
                if (firstchild) document.body.insertBefore(cssTag, firstchild);
                else document.body.appendChild(cssTag);
            }
            else {
                p.appendChild(cssTag);
            }
        }
    }

    /**
    * 加载在线js文件

    * @method LoadCssFile
    * @param {String} path Css File 的 Web路径
    * @param {Function} callback 加载后执行的方法
    */
     Utility.prototype.loadJsFile = function(path, callback) {
        if (!path)
            return;
        var genId = "dynamic_res_" + path.split("?")[0].replace(/\//g, "_").replace(/./g, "_").replace(/-/g, "_").replace(/:/g, "");
        var jsTag = document.getElementById(genId);
        if (!jsTag) {
            jsTag = document.createElement("script");
            jsTag.id = genId;
            jsTag.type = "text/javascript";
            jsTag.src = path;
            document.body.appendChild(jsTag);
        }
        if (typeof(callback)=="function")
            callback();
    }

    /**
    * 预加载图片文件

    * @method preloadImage
    * @param {String} url Image File 的 Web路径
    * @param {Function} callback(image) 加载后执行的方法
    */
    Utility.prototype.preloadImage = function(url, callback){
        var img  = new Image();
        img.onload = function(e){
            if (typeof(callback)=="function")
                callback(this);
        }
        img.src = url;
    }

    /**
     * 获取浏览器语言
     */
    Utility.prototype.detectLanguage = function(){
        var l_lang;
        if (navigator.userLanguage) // Explorer
            l_lang = navigator.userLanguage;
        else if (navigator.language) // FF, Webkit
            l_lang = navigator.language;
        else
            l_lang = "en";

        return l_lang;
    }
    
    /**
     * 监视浏览器resize事件
     */
    Utility.prototype.monitorWindow = function(){
        var timer;
        function adjustBody(){
            //resolve resize event fires twice
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                var w = document.documentElement.clientWidth || document.body.clientWidth;
                var h = document.documentElement.clientHeight || document.body.clientHeight;

                document.body.style.height = h + "px";

                try{
                    $$jxhl.notifyResize(document.body);
                }
                catch(x){
                }
            },10);
        }

        adjustBody();

        if(window.addEventListener){
            window.addEventListener('resize', adjustBody, false);
        }
        else{
            window.attachEvent('resize', adjustBody);
        }
    }

    /**
     * 加载jxhl layout, based on layout/ path
     */
    Utility.prototype.loadJxhlLayout = function(name, sendArgs, containerOrId, alterCss, callback){
        var tag;
        if(typeof(containerOrId)!="undefined" && containerOrId){
            tag = typeof(containerOrId)=="string"?document.getElementById(containerOrId):containerOrId;
        }
        else{
            tag = this.topContainer || $("div[data-role='content']").get(0);    
        }
        //tag.className = alterCss || "body ui-content";
        $$jxhl.init(this.baseUri + "layout/" + name + ".xml", tag, "path", sendArgs, callback);
    }

    /**
     * special alert function
     * @param msg
     */
    Utility.prototype.alert = function(msg,title,buttonName,callback){

        title = title || '提示';
        buttonName = buttonName || '确定';

        if(navigator.notification && navigator.notification.alert){
            navigator.notification.alert(msg, callback, title, buttonName);
            return;
        }
        //
        var w = $(window).width();
        var h = $(window).height();

        var divCover = document.createElement('div');
        divCover.className = 'cover-panel';
        divCover.style.height = h + 'px';
        divCover.style.width = w + 'px';
        $(document.body).append(divCover);

        var divBox = document.createElement('div');
        divBox.className = 'cover-box';
        divCover.appendChild(divBox);

        var divTitle = document.createElement('div');
        divTitle.className = 'cover-title';
        divBox.appendChild(divTitle);

        var divBody = document.createElement('div');
        divBody.className = 'cover-body';
        divBox.appendChild(divBody);

        var divFooter = document.createElement('div');
        divFooter.className = 'cover-footer';
        divBox.appendChild(divFooter);

        var bh = $(divBox).height();
        divBox.style.marginTop = parseInt((h-bh)/2) + 'px';


        divTitle.innerHTML = title;
        divBody.innerHTML = msg;

        var divButton = document.createElement('div');
        divButton.innerHTML = buttonName;
        divFooter.appendChild(divButton);

        divButton.onclick = function(){
            if(typeof(callback)=='function')
                callback();

            $(divCover).remove();
        }
    }

    /**
     * apecial confirm function
     * @param msg
     * @param successCall
     * @param failCall
     */
    Utility.prototype.confirm = function(msg, title, buttonLabels, successCall, failCall){
        title = title || '确认';
        buttonLabels = buttonLabels || ['确定','取消'];

        if(navigator.notification && navigator.notification.confirm){
            navigator.notification.confirm(msg, function(index){
                if(index==1){
                    if(typeof(successCall)=='function')
                        successCall();
                }
                else if(index==2){
                    if(typeof(failCall)=='function')
                        failCall();
                }
            }, title, buttonLabels);
            return;
        }

        //
        var w = $(window).width();
        var h = $(window).height();

        var divCover = document.createElement('div');
        divCover.className = 'cover-panel';
        divCover.style.height = h + 'px';
        divCover.style.width = w + 'px';
        $(document.body).append(divCover);

        var divBox = document.createElement('div');
        divBox.className = 'cover-box';
        divCover.appendChild(divBox);

        var divTitle = document.createElement('div');
        divTitle.className = 'cover-title';
        divBox.appendChild(divTitle);

        var divBody = document.createElement('div');
        divBody.className = 'cover-body';
        divBox.appendChild(divBody);

        var divFooter = document.createElement('div');
        divFooter.className = 'cover-footer';
        divBox.appendChild(divFooter);

        var bh = $(divBox).height();
        divBox.style.marginTop = parseInt((h-bh)/2) + 'px';


        divTitle.innerHTML = title;
        divBody.innerHTML = msg;

        var divButtonLeft = document.createElement('div');
        divButtonLeft.style.cssText = 'float:left; width:50%; display:block;';
        divButtonLeft.className = 'cover-button-split';
        divButtonLeft.innerHTML = buttonLabels[0];
        divFooter.appendChild(divButtonLeft);

        var divButtonRight = document.createElement('div');
        divButtonRight.style.cssText = 'float:left; width:50%; display:block;';
        divButtonRight.innerHTML = buttonLabels[1];
        divFooter.appendChild(divButtonRight);

        divButtonLeft.onclick = function(){
            if(typeof(successCall)=='function')
                successCall();

            $(divCover).remove();
        }

        divButtonRight.onclick = function(){
            if(typeof(successCall)=='function')
                successCall();

            $(divCover).remove();
        }
    }
    
    
    /**
     * 是否滑动到底部
     */
    Utility.prototype.isScrollDown = function (ele, p) {
        if (!p) {
            var p = ele.parentNode;

            if ($(p).scrollTop() + $(p).height() >= $(ele).height())
                return true;
            return false;
        }
        
        p = ele;
        if ($(p).scrollTop() + $(p).height() >= p.scrollHeight)
            return true;
        return false;
    }

    /**
    * 是否滑到顶部
    */
    Utility.prototype.isScrollTop = function (p) {
        if ($(p).scrollTop() == 0)
            return true;
        return false;
    }

    /**
    * 绑定上滑、下滑事件，需要jquery支持
    * 需要自己控制上下边界逻辑
    */
    Utility.prototype.bindEdgeEvent = function (ele, upFunc, downFunc) {
        var self = this;

        $(ele).touchwipe({
            wipeLeft: function () { },
            wipeRight: function () { },
            wipeDown: function () {
                console.log('wipe down..', new Date());
                if (!self.isScrollDown.apply(self, [ele, true])) return;
                if (downFunc) downFunc();
            },
            wipeUp: function () {
                console.log('wipe up..', new Date());
                if (!self.isScrollTop.apply(self, [ele, true])) return;
                if (upFunc) upFunc();
            },
            min_move_x: 10,
            min_move_y: 10,
            preventDefaultEvents: false
        });

        //鼠标滚动
        ele.onscroll = function (e) {
            console.log('dom scroll..', new Date());
            if (upFunc && self.isScrollTop.apply(self, [ele, true])) upFunc();
            if (downFunc && self.isScrollDown.apply(self, [ele, true])) downFunc();
        }

        function wheel(event) {
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                // scroll up
                console.log('mouse wheel up..', new Date());
                if (!self.isScrollTop.apply(self, [ele, true])) return;
                if (upFunc) upFunc();
            }
            else {
                // scroll down
                console.log('mouse wheel down..', new Date());
                if (!self.isScrollDown.apply(self, [ele, true])) return;
                if (downFunc) downFunc();
            }
        }
        if (ele.jqueryPreWheel)
            $(ele).unbind('mousewheel DOMMouseScroll', ele.jqueryPreWheel);
        ele.jqueryPreWheel = wheel;
        $(ele).bind('mousewheel DOMMouseScroll', wheel);
    }

    this.utility = new Utility();
});