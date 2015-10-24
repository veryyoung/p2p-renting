package gg.sf.renting.utils;

import gg.sf.renting.security.DESTextCipher;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.GeneralSecurityException;

/**
 * Created by veryyoung on 2015/10/24.
 */
public class EncryptConverter {

    private static Logger logger = LoggerFactory.getLogger(EncryptConverter.class);

    private static final DESTextCipher cipher = new DESTextCipher();

    private static boolean isIninted = false;

    private static final String SALT = "/AhkEG=T.[#*<Lk+\"Q0N";

    public static String encrypt(String value) {
        initialize();
        if (StringUtils.isNotEmpty(value)) {
            try {
                return cipher.encrypt(value);
            } catch (GeneralSecurityException ex) {
                logger.error("Can't encrypt value.[value={}]", value, ex);
            }
        }
        return value;
    }

    public static String decrypt(String value) {
        initialize();
        if (StringUtils.isNotEmpty(value)) {
            try {
                return cipher.decrypt(value);
            } catch (GeneralSecurityException ex) {
                logger.error("Can't decrypt value.[value={}]", value, ex);
            }
        }
        return value;
    }


    public static void initialize() {
        if (!isIninted) {
            cipher.init(SALT);
            isIninted = true;
            logger.debug("TC init.[salt={}]", SALT);
        }
    }

    public static void main(String args[]) {
        System.out.println(EncryptConverter.encrypt("password"));
        System.out.println(EncryptConverter.decrypt("WF6YikntBM66c28Zha5tFA=="));
    }


}
