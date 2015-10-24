package gg.sf.renting.service;

/**
 * Created by veryyoung on 2015/10/24.
 */
public interface TokenService {


    /**
     * 判断token是否有效
     *
     * @param token
     * @return
     */
    boolean checkToken(String token);


    /**
     * 登陆成功后，存储token 并返回token
     */
    String storeToken(String accountId);


    /**
     * 登出
     */
    void logout(String token);

}