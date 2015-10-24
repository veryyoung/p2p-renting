package gg.sf.renting.dao;

import gg.sf.renting.entity.LandlordInfo;
import org.springframework.stereotype.Repository;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class LandInfoDao extends BaseDao<LandlordInfo> {

    public LandInfoDao() {
        super(LandlordInfo.class);
    }

}
