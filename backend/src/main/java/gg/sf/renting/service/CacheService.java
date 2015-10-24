package gg.sf.renting.service;

/**
 * Created by veryyoung on 2015/10/24.
 */
public interface CacheService {

    void put(String key, Object value, long timeToLiveSeconds);

    void delete(String key);

    Object get(String key);


}
