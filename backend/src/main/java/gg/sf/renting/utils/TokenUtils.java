package gg.sf.renting.utils;

import org.apache.commons.lang3.StringUtils;

import java.net.URLDecoder;

/**
 * Created by veryyoung on 2015/10/24.
 */
public class TokenUtils {

    public static final String TOKEN_SEPARATOR = "|";

    public static String getAccountIdFromToken(String token) {
        if (StringUtils.isNotEmpty(token)) {
            return EncryptConverter.decrypt(URLDecoder.decode(token)).split("\\" + TOKEN_SEPARATOR)[0];
        }
        return null;
    }
}
