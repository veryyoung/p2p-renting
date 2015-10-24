package gg.sf.renting.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by veryyoung on 2015/10/24.
 */
public class MobileUtils {

    public static boolean isMobile(String mobile) {
        Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
        Matcher m = p.matcher(mobile);
        return m.matches();
    }
}
