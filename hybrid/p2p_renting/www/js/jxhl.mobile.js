jxhl.extension(function () {
    // mobile

    this.mobile = {
        platform : "",
        resPath : [],


        fillPhoneGap : function(device){
            var ratio = window.devicePixelRatio || 1;
            var width = parseInt(window.screen.width * ratio);
            var height = parseInt(window.screen.height * ratio);

            if(!device) return;

            //android has no xxhdpi and xxxhdpi yet
            var pf = device.platform.toLowerCase();
            var map = {'android': {}, 'ios':{}};
            map['android'] = {
                '200x320': 'ldpi',
                '320x200': 'ldpi',
                '320x480': 'mdpi',
                '480x320': 'mdpi',
                '480x800': 'hdpi',
                '800x480': 'hdpi',
                '480x854': 'hdpi',
                '854x480': 'hdpi',
                '540x960': 'hdpi',
                '960x540': 'hdpi',
                '720x1280': 'xhdpi',
                '1280x720': 'xhdpi',
                '1080x1920': 'xxhdpi',
                '1920x1080': 'xxhdpi',
                'default': 'hdpi'
            };

            map['ios'] = {
                '768x1024': 'tablet',
                '1024x768': 'tablet',
                '1536x2048': 'tablet',
                '2048x1536': 'tablet',
                '320x480': 'iphone4',
                '480x320': 'iphone4',
                '640x960': 'iphone4',
                '960x640': 'iphone4',
                '640x1136': 'iphone5',
                '1136x640': 'iphone5',
                '750x1334': 'iphone6',
                '1334x750': 'iphone6',
                '1242x2208': 'iphone6plus',
                '2208x1242': 'iphone6plus',
                'default': 'iphone5'
            };

            var key = width.toString() + 'x' + height.toString();
            var dict = map[pf];
            if(dict){
                this.resPath = [pf, dict[key]||dict['default']];
            }

        },
        getResPath : function(name, ext){

            if(!ext) ext = 'png';

            var width = window.screen.width;
            var height = window.screen.height;
            var ratio = window.devicePixelRatio || 1;

            //这里要动态获取的原因是：APP可能会旋转

            if(this.resPath.length===0){
                return name + '.' + ext;
            }

            var suffix = width>height?'@landscape':'@portrait';
            return this.resPath.join('/') + '/' + name + suffix + '.' + ext;
        }
    };

});