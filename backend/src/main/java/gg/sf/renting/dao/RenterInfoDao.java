package gg.sf.renting.dao;

import gg.sf.renting.entity.RenterInfo;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;


/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class RenterInfoDao extends BaseDao<RenterInfo> {

    public RenterInfoDao() {
        super(RenterInfo.class);
    }

    public RenterInfo findByUserId(String userId) {
        Query query = getCurrentSession().createQuery("from RenterInfo as renterInfo where renterInfo.userId = :userId");
        query.setString("userId", userId);
        return (RenterInfo) query.uniqueResult();
    }

}
