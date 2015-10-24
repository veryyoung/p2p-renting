package gg.sf.renting.service.impl;

import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.CacheService;
import gg.sf.renting.service.TokenService;
import gg.sf.renting.utils.EncryptConverter;
import gg.sf.renting.utils.TokenUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Service
public class TokenServiceImpl extends BaseService implements TokenService {

    @Autowired
    private CacheService cacheService;

    @Override
    public boolean checkToken(String token) {
        if (StringUtils.isEmpty(token)) {
            return false;
        }

        token = EncryptConverter.decrypt(URLDecoder.decode(token));

        if (!token.contains(TokenUtils.TOKEN_SEPARATOR)) {
            return false;
        }

        String[] strings = token.split("\\" + TokenUtils.TOKEN_SEPARATOR);

        String accountId = strings[0];

        String storedToken = (String) cacheService.get(accountId);

        if (StringUtils.isEmpty(storedToken)) {
            return false;
        }

        if (!storedToken.equals(token)) {
            return false;
        }

        // 重新 put ，延长 token 有效期
        cacheService.put(accountId, token, 1800);

        return true;
    }

    @Override
    public String storeToken(String accountId) {
        String token = accountId + TokenUtils.TOKEN_SEPARATOR + new Date().getTime() + TokenUtils.TOKEN_SEPARATOR + RandomStringUtils.random(5, true, true);
        logger.info("store {} in cache for account {}", token, accountId);
        cacheService.put(accountId, token, 1800);
        return URLEncoder.encode(EncryptConverter.encrypt(token));
    }

    @Override
    public void logout(String token) {
        String accountId = TokenUtils.getAccountIdFromToken(token);
        logger.info("delete token {} in cache for account {}", token, accountId);
        cacheService.delete(accountId);
    }
}