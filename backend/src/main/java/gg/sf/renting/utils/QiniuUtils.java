package gg.sf.renting.utils;

import com.qiniu.api.auth.AuthException;
import com.qiniu.api.auth.DigestAuthClient;
import com.qiniu.api.auth.digest.Mac;
import com.qiniu.api.config.Config;
import com.qiniu.api.io.IoApi;
import com.qiniu.api.io.PutExtra;
import com.qiniu.api.io.PutRet;
import com.qiniu.api.net.CallRet;
import com.qiniu.api.net.Client;
import com.qiniu.api.net.EncodeUtils;
import com.qiniu.api.net.Http;
import com.qiniu.api.rs.PutPolicy;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * Created by veryyoung on 2015/10/24.
 */
public class QiniuUtils {

    public static final String ACCESS_KEY = "";

    public static final String SECRET_KEY = "";

    private static final String BUCKET_NAME = "";

    public static final String QINIU_URL = "http://7xnrqg.com1.z0.glb.clouddn.com/";

    private static Logger logger = LoggerFactory.getLogger(QiniuUtils.class);

    /**
     * 上传对应主题的图片到七牛云
     */
    public static String upload(String file64, String key) {

        Mac mac = new Mac(ACCESS_KEY, SECRET_KEY);
        PutPolicy putPolicy = new PutPolicy(BUCKET_NAME);

        String responseBody = null;

        String uptoken = null;
        try {
            uptoken = putPolicy.token(mac);
        } catch (AuthException e) {
            e.printStackTrace();
        }
        String url = "http://up.qiniu.com/putb64/-1/key/" + EncodeUtils.urlsafeEncode(key);

        HttpPost post = new HttpPost(url);
        post.addHeader("Content-Type", "application/octet-stream");
        post.addHeader("Authorization", "UpToken " + uptoken);
        try {
            post.setEntity(new StringEntity(file64));
            HttpClient c = Http.getClient();
            HttpResponse res = c.execute(post);
            HttpEntity httpEntity = res.getEntity();
            responseBody = EntityUtils.toString(httpEntity, Config.CHARSET);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return responseBody;


    }


    public static void delete(String key) {
        String encodeTo = EncodeUtils.urlsafeEncode(BUCKET_NAME.concat(":").concat(key));
        String url = "http://rs.qiniu.com/delete/" + encodeTo;
        Mac mac = new com.qiniu.api.auth.digest.Mac(QiniuUtils.ACCESS_KEY, QiniuUtils.SECRET_KEY);
        Client client = new DigestAuthClient(mac);
        CallRet ret = client.call(url);
        logger.info("delete image:{},response is:{}", key, ret);
    }

    public static void main(String[] args) {
        upload("iVBORw0KGgoAAAANSUhEUgAAACEAAAB/CAYAAABhYKvoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\n" +
                "bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp\n" +
                "bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6\n" +
                "eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0\n" +
                "NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo\n" +
                "dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw\n" +
                "dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv\n" +
                "IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS\n" +
                "ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD\n" +
                "cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu\n" +
                "Y2VJRD0ieG1wLmlpZDoxNEIxM0E3MzM0MkQxMUU1ODk5MEM3NURGQUNBNDg1MSIgeG1wTU06RG9j\n" +
                "dW1lbnRJRD0ieG1wLmRpZDoxNEIxM0E3NDM0MkQxMUU1ODk5MEM3NURGQUNBNDg1MSI+IDx4bXBN\n" +
                "TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0QjEzQTcxMzQyRDExRTU4\n" +
                "OTkwQzc1REZBQ0E0ODUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE0QjEzQTcyMzQyRDEx\n" +
                "RTU4OTkwQzc1REZBQ0E0ODUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4\n" +
                "bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+C+6JdQAAEBxJREFUeNq8W3uMXFUZ/507dx77mNll\n" +
                "291tuwWK5VFaSmmgdgOhtU1bn8FIakJIbECjqKAxxUCqRk1MJNb4hwlFm2DKH0ajQtQUFdoIQtF0\n" +
                "EYxQreWxRdtuaXe7dGf2OTM7czz3ztw73/nOd7f+5exOZubc17nf+R6/7/d9V938q5EMgG3m/U3z\n" +
                "XmfeOfyfX755fwEaPzCfqWBAm7/gpZRC86v5Yb7q5njwo/kK9g1/q/BHfGy8X3PX+FgVDbT27e/O\n" +
                "hJP4hNk5RXe2DmyeiV4smlgwFuwXbbN+k4uF440frZtsjo1OVOGZ36vCcd3YEP41Zxx8BjvGk9NE\n" +
                "huSYcLsmN6GIpBSTnFLWpIP/YBKL6IHRBWIJRAe15GydNJYAvQBbmmif8Ka0trfphk74zl2yCVER\n" +
                "UhHHd6lakrH0ik9ItyZMr+XRgywl1LZeUGmEF6f6oW2FTZKcNYHm5IJreIAtXqqcXOw6+mtOMlJg\n" +
                "ehN0iegEqbVwaXnSoGURcLWe3lE0ZumHbk3akoYWJIXmclDls5YGrbu3/AK7ePy9eXFuEZJk6c36\n" +
                "zgyZg0k6QfDKtKeQMl9npuf5TpbDs6QoWIgv3g0ROTW/cDyr8PDabmxdmkNPtjFWrNRw5HwV3329\n" +
                "iMpszVLu2IqIDkUTiZffxA4db2Razceu78visdt6MF3V+P3pGQyNlTFvjt7Ym8WHBtqwuM3D7qGL\n" +
                "eOXsnGvakkSbk2tMQnCnfHm8nMIz2/swMlPHp18aR32uZt2hyijsu7UHa3oy+OjhMUxOVm29UbaL\n" +
                "p989avuW51Ot5QneX1qVh+8p3PvCGHS57uhNvVLHF18cR6ms8dU1eeeOeUyh0vaof4h1IPIDqmWy\n" +
                "G3pzeH6kDF3Vlu1H1hN+r2s8OzKLWxZlLZ2SHBidmGWijkttTiQYu7wjhX9MVMJ9rlycwfar2uN9\n" +
                "N13RjtX92fD7Py9W0Gd0Ayltu3RirrHSNgOkL5meZRlNkZ8wIffmxVlcb+L/nSva8NtTszj8zky4\n" +
                "bf2iDHZd3YFDI3MoGUkNl+aha63YIbntKLS3TJSE4Ng7MjN6dbyCz13X6fgCeoc7Bhqg7JfvTNtm\n" +
                "CdtPcKzhWbNkCIh6tf3GB2w4eA5vFqtO0I1eZ6bruPV357H31aItAcUCF9U/sABGxWd5zGjyc3V8\n" +
                "6sg4Drw1hVq9JdZaPbj7GdxlLCd0VtoOZlwxnagc+IlI/FzE8RjDkLE7RoJ3FZyThF+jfX0RfDCc\n" +
                "6UQ/bdu/pNRJ0ZZLpGUdygUmNJBxiUgw0EHaYDqhiaR0C5EF333qD7gni9dOw/F0VJGtCwt+AToh\n" +
                "4dAET8QHKoaulI0n+PbYySkGAZSLrPlkqeQ8vvYcTfHloaE5xgXadceWMupWMKRu3sIT1KHQrCpc\n" +
                "O4KkuXidJVBIVM5oWSXgZEVRehC/G0fLIwekbGuKlsPSNQ4Tm/tF5/Icc2TmI+WgYsqobIdnoW1l\n" +
                "Z3bcZH0OXix/r5So3TzAxQiJAlwtOCbt5rWx247xBDU5hphp9LOycSlnEaA9jR80OY4lsbKvw/ET\n" +
                "ov/gL+6d4+jL9tFu7hH8Pnl+puUxT47NJC4FVSDLtCTnRjwrd2QWomcm6nEUxWNEbG4KllMS3beQ\n" +
                "mzoKLWTrnpV5a4jZF0dI4XmV4FFhj1Mva2VeDNj4jtsWvGdCZHYUmFoGN1EpZkSTs9JAyycoe5xn\n" +
                "Ygu9OGB2aCTGd3lSguqINyGxFQMjS4qtTyUstyZo27mTpGXRMmsXxxuG0ByzF6TlOWm+ErCgshV3\n" +
                "QZeuZV8iZfnR+T1uBTFcY+ZITdUBqwpi0Esk2xgI9iXxWDkjEzm/e8m0HbevSSiPdEQLaaAzWy0v\n" +
                "wdplOSyN9k9aZ0a+WWFfu7HFl2ZvIWgKeJHBVwYXYfnZi/jg0Rns2dSH9bnwwHj62ZTC8eEJ7Hmj\n" +
                "HAMjh4xNAjV8MpQKbr2qGJ7TmDOJpkIO6/vSWJkNcs8aRkzSMzJVRznnY313yoojMZHKQJAoCUl7\n" +
                "IxHeuHYxvrfCRy6nUMj14BfbTToY0BS5NDYva91lNgUMKyECM8cXg+EolCeGaUKo6kodZ6fnMZBO\n" +
                "oTw3jzNzCqu7gNLELH58qoauTLAPcNOqPAYIAOZ+gwfHOA1c2AXa4fprOwaw7uJ53PVXD49+vBeD\n" +
                "GfeQ48MXsOtvFblsIVAR/qVccJw96YaeZM0RV6/oxysr6jh6ahYHCaAJZmpWB+jIY881k3jkrYob\n" +
                "e4RP/9LBoPFxx/t78fCVaQR8TLlUxlDVx8blOZQD+s7od8FIpGSWLLxpo+7/mmBJdVJgg/4fJtHc\n" +
                "+WTZWMHoDCYL7Vg2MYndQxXs3rYUd2IKm/6YxpGdGfx86D0cTRnNnJ7FsQnlEGZUAiK3vaB1mNex\n" +
                "18aw68UJjJo7z4Vb2nF7t8JIcQ5eAWH16r7be3Hg1h7s33iZq0/QjguIJrawTtAUrnnScrAcSmPN\n" +
                "hjwuD4aXX4Z7JmpmUxUfe3IM57RL1jsssWbMnmgd2iU1Mv2deKDfw7qVnegdLyPXl0X53DSOt7dj\n" +
                "c6FxspMTVZRqdaTTHiYnpvHAyzPJIZ34EV+cgMBDXNufw93XGu2br+N0Rxpdc2V8+aUijukJrL2y\n" +
                "C3evyGJNIYWBRk0PU9V5kc3hcSOUiCMJLSPjRFtXSi5HMjbXgf6K8RM0wFCUrMifg7SZd6Uomqf/\n" +
                "/Bwx9lBw2TvrLjQjR4grtrZpyCVLuKQJL8g4CTHPQ+Ncg2ZXUkGFI3At40yHdBHpIkESTjqgGRBW\n" +
                "yZlXEsRzeBCJTJUKJRKrF4xtvaYDSxhXJdXNKREXR2VS0vA4kKXL4EB1RZejgK+v68JT2woWVyXW\n" +
                "2HUyhg0nl8TocoCb6c/j8ZvaDJBpgMRKDcjnM1hpXMeFYhVnjDtPN1wEcp7CmXMlPPha2S7YU1Mn\n" +
                "0hEZXSltC0YzaRPKa2YCdR8r88DoVAD3Ajjl46ZOE+CmDdQyGLPga0zO1NxSZkJqaTO6Ssmpvfmv\n" +
                "jJZw19Ol8PsNt/TjiYKHw4fG8JjZZ+vGfuy9wiAuE113vTztODgphaTL71GfQMtOtDRNreTm9Yvx\n" +
                "xIoUxkansK85+NzQeew9U8XqK7rw3JaulvLxEjarHFulBt434Uw8nFgGezYvwX6jBMVSFYW+PPZd\n" +
                "lw43t6/qxUPLU3jhrBlf1IHnt3eLbQ+8EGPlolYhXuCuG2LLYVOvh7ffLWHrs6N4YRYYvLELa700\n" +
                "fnS9mcxcFbv/PIrvjNRQyKdxA3NsPHjRulvLOij/sFCdtDlJv1DAwe0mrIdDdRw49C72FWVOSgx6\n" +
                "PPmJ0kAnYRGK89HyzBdnMVxtntlI4WhxYQ6DdxUkMrpUQXlPBGXst6zrwR92BnC/jqHTFZRyWez/\n" +
                "5DL8ZGPeeFAXRyaxxnatXLsekd9Ftr+Ab1+Xw2B/GgGkLE+X8f2/jOM3RgJ+Vyd+OJjHxnzjBGcM\n" +
                "wjr8ZhH7TlUdkMRL4DFTw9eQ/w5nm/LDCRhcjwMninj0P5V4W9X4h/ufmUJmWSceWWPgXncGqwt1\n" +
                "kVrgWDOUMJWESHiqhAYfqURxiUyLSySKN56otZCL69bJlB3knLYHuIyPbfKM0ZVYGK5YVnTUrKVJ\n" +
                "ACscl3ByjaYTvtPAAy2SpEk6Y01YQyTdHFxB2yTiDEzZdszREgUsIlqirXKspYG2xzkNY4r6Cc0i\n" +
                "nlD14xQxRcxSN5lISUsFO8roWuvKmjR4UOMdAE5NnEVfThNxffIT475ykfMDH1iCe0wQK9ejSZtL\n" +
                "1htUgIrML+h5Ks3gtkMTlud1Ks0RjRiDGsmrCcj59HQVQwbWlQJOwjMjqTR29Pt4e3QWJ6oGdZnh\n" +
                "bFahdLHs4lZllzToNqe7SGr64lX+mIktXIajO9rw9JGz+NY5OS443QJCL5eXlPLFkU65HjQOwW3N\n" +
                "2aS0U3KUSHUnd7FMNAkHKmWbmEAJOjpEAEsMC5RyJEy9rGe5bOILrDRQqFtJ9AFvKk7iwDgx71SI\n" +
                "nQqN1onNnGK3onaLKlLVh0rbT6pd8WoQ5xmC//pcc+LTtnS4VfBGHq4CflJPAx9bek0P9l7lh11l\n" +
                "sc55jXsY3NCLx81IOrxQMK4wdraIB49V3PYHgYrynbtWcs/2QEcKy827XI0hdEignp6aRy7nY1mM\n" +
                "JwwKM9hn0lMiVcQbAONc1GnyvkQHUVJHO7cWqb3S6VJySg1SFJW4Bp3cY2llWMo2SSvbJxHal9Aw\n" +
                "N0GntUFqcyBtLpISJ0nHsQ4HhDBQmsTySb37oqSYuUc64XGwGhNjJAI6vQ9C+XLBfFMnZGDN71Yo\n" +
                "d1BzQns8L0Xwip+olKxmThXcSwKq1vo7xFoGa7uUBXr97lyDv2IdRhws8+73VkmSFV6dFI4hrfu3\n" +
                "LcYTO/pwR8zIdeKpbYsa/BWrJvJyJ+/HsGJHYqsi47GCA/cdfg/D2sfDWxpNop/ZksdyNY9vHC4l\n" +
                "F/GllktNWiF5miaZU7A93dWFn25uR59JeguZVDg6OqsbPbnmNVmtm2Pm8bM/jeHxklow5FPH5ZSp\n" +
                "KYbgOUaqw8fVWQ9///cUDs0ZnJdtw0Mmnhx8vYgTGQ8Fk53ftyKD5YGAivLzQ5a7XqhCzKNhPOta\n" +
                "o+jyviVtuDuIESoV7jx4bTsGwwul4tlLkqXglu7jL+jrhQkGhbjh8QqOB4HM97FzuY/j56q44CEE\n" +
                "vjsH0m5DF9cJluP4DgnOMnPLEzZ7sXs7PFxeMWMZL7xcb3sqfHis8TtaTe24fd7aEE3G5yUhqUgS\n" +
                "zb58dhaHx1NYZnKLfCaA/Q0KN1iFzlSwdw3Hx6t4esTt0aZu36oaWEUXLbe8RrZ8w42L8esP580E\n" +
                "oguoJsWskEt5zbFAe1N46CP92LcuayF48QmHppUk6gQHHxdma6jU08g13VtYrE83zhQuvRnPRf2b\n" +
                "NY2x2ZqIUah7j9mamKnhrWtCKxIP9+nuRXh+u4fPPzmGY1pomWb9W06hRjOShNqvk8CymBItkcrq\n" +
                "8Im+zQUWWWkjkIJ8U7RWRslUx0yVwFXxHhtcQnoSawfh+Q6pRc1hXpTcNsvLFA5PRckXpZw22bjy\n" +
                "o8mf2Ckk1D94ixMvxjlAmMFFKkGb5U8wJek5MKc+yigg3rWWVDm0q4FK7nHgVbzEEJ1AE/JiLy8A\n" +
                "O12IYv82pwkTmkJ5Y7HE3jqP8mmpk4Sk69JBVuYEOSglPYQoQT47dlD/LqT21oNjgkOyyA+9QJ2D\n" +
                "P3LDe3S5iKSykfMYJtMLaoLiAwXK7bmy+QnukIhC8mfEeA7idIwot9Rt6Rdro/TE9kRt+3pqvhR9\n" +
                "JT0hm/SgahJN7UvJiIWIaeVHKyfJiRVYy+3RYp83K/Y5oTyJ+uO6IrWmcH9BPa1FrGvtPAdWl8AM\n" +
                "f4aUP6Yb1z2VEvv5pcYua5nJpINJ7OfKyJNgp41Buxw1f7SCtiZwooy7gGASz5rjXkfQZmleYubF\n" +
                "Wqcd3MCAsvO0JSsAU1/T15UOJxE0Q91rfn/WnPgN8zlP66ScbeFLQPlPfgw/j7RttFjFfwUYAOL6\n" +
                "D9Yy4wctAAAAAElFTkSuQmCC", "thisisatest");
    }
}
