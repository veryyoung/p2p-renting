package gg.sf.renting.dao;

import gg.sf.renting.entity.LandlordInfo;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;


/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class LandInfoDao extends BaseDao<LandlordInfo> {

    public LandInfoDao() {
        super(LandlordInfo.class);
    }

    public LandlordInfo findByUserId(String userId) {
        Query query = getCurrentSession().createQuery("from LandlordInfo as landlordInfo where landlordInfo.userId = :userId");
        query.setString("userId", userId);
        return (LandlordInfo) query.uniqueResult();
    }

}
