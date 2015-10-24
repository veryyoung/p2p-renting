package gg.sf.renting.utils;

import com.qiniu.api.auth.AuthException;
import com.qiniu.api.auth.DigestAuthClient;
import com.qiniu.api.auth.digest.Mac;
import com.qiniu.api.io.IoApi;
import com.qiniu.api.io.PutExtra;
import com.qiniu.api.io.PutRet;
import com.qiniu.api.net.CallRet;
import com.qiniu.api.net.Client;
import com.qiniu.api.net.EncodeUtils;
import com.qiniu.api.rs.PutPolicy;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by veryyoung on 2015/10/24.
 */
public class QiniuUtils {

    public static final String ACCESS_KEY = "1OcsILqPu9A_YrO7bgAEBowPWwmjTfzt_zUoINRC";

    public static final String SECRET_KEY = "BW1s2xfqoty1RRzNI4xhVMs6dt6i7zjf3FdbX9Ty";

    private static final String BUCKET_NAME = "renting";

    public static final String QINIU_URL = "http://7xnrqg.com1.z0.glb.clouddn.com/";

    private static Logger logger = LoggerFactory.getLogger(QiniuUtils.class);


    public static void delete(String key) {
        String encodeTo = EncodeUtils.urlsafeEncode(BUCKET_NAME.concat(":").concat(key));
        String url = "http://rs.qiniu.com/delete/" + encodeTo;
        Mac mac = new com.qiniu.api.auth.digest.Mac(QiniuUtils.ACCESS_KEY, QiniuUtils.SECRET_KEY);
        Client client = new DigestAuthClient(mac);
        CallRet ret = client.call(url);
        logger.info("delete image:{},response is:{}", key, ret);

    }
}
