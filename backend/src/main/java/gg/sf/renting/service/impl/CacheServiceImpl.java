package gg.sf.renting.service.impl;

import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.CacheService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * cache 服务，懒得搞 redis，就放内存
 * <p>
 * Created by veryyoung on 2015/10/24.
 */

@Service
public class CacheServiceImpl extends BaseService implements CacheService {

    private static Map<String, Object> LOCAL_CACHE;

    static {
        LOCAL_CACHE = new ConcurrentHashMap<>();
    }

    @Override
    public void put(String key, Object value, long timeToLiveSeconds) {
        if (null == get(key)) {
            LOCAL_CACHE.put(key, value);
        }else {
            LOCAL_CACHE.remove(key);
            LOCAL_CACHE.put(key, value);
        }
    }


    @Override
    public void delete(String key) {
        if (null != get(key)) {
            LOCAL_CACHE.remove(key);
        }
    }

    @Override
    public Object get(String key) {
        return LOCAL_CACHE.get(key);
    }
}
