/**
 * Created by xjf on 15/3/6.
 */
;define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";

    var Validation ={
        errorMessage : {
            MOBILE_NULL: '请填写手机号码',
            MOBILE_INVALID: '请输入正确的手机号',
            EMAIL_NULL: '请填写电子邮箱',
            EMAIL_INVALID: '请输入正确的邮箱',
            IDNUMBER_INVALID: '请正确填写身份证号码'
        }
    }

    /**
     * check mobile
     *
     * @method checkMobile
     * @param {String} str value
     * @returns {{success: (true|false), comment: string}}
     */
    Validation.checkMobile = function (str) {
        if (!str || !str.length) return this.combineReturn(false, 'MOBILE_NULL');
        if (!('' + str).match(/^[1][3|4|5|7|8][0-9]{9}$/)) return this.combineReturn(false, 'MOBILE_INVALID');
        return this.combineReturn(true);
    }

    
    Validation.checkEmail = function (str) {
        if (!str || !str.length) return this.combineReturn(false, 'EMAIL_NULL');
        if (!(''+str).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) return this.combineReturn(false, 'EMAIL_INVALID');
        return this.combineReturn(true);
    }

    Validation.checkIdNumber = function(str){

        var num = str.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return this.combineReturn(false, 'IDNUMBER_INVALID');
        }
        //验证前2位，城市符合
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if(aCity[parseInt(num.substr(0,2))]==null){
            return this.combineReturn(false, 'IDNUMBER_INVALID');
        }

        //下面分别分析出生日期和校验位
        var len, re; len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);  //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay; bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //alert('身份证号的出生日期不对！');
                return this.combineReturn(false, 'IDNUMBER_INVALID');
            } else {
                //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for(i = 0; i < 17; i ++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];

                return this.combineReturn(true);
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);  //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay; bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //alert('身份证号的出生日期不对！');
                return this.combineReturn(false, 'IDNUMBER_INVALID');
            }
            else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for(i = 0; i < 17; i ++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    //alert('18位身份证号的校验码不正确！');
                    return this.combineReturn(false, 'IDNUMBER_INVALID');
                }

                return this.combineReturn(true);
            }
        }

        return this.combineReturn(false, 'IDNUMBER_INVALID');
    }

    Validation.combineReturn = function(success, error){
        var obj = {success:success};
        if(error) obj.comment = this.errorMessage[error] || null;
        return obj;
    }

    module.exports = Validation;
});